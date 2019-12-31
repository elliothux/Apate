use crate::utils::{add_u8, minus_u8};
use std::u8;
use wasm_bindgen::prelude::*;

#[derive(Copy, Clone)]
pub struct RGB {
    pub r: u8,
    pub g: u8,
    pub b: u8,
}

impl RGB {
    pub fn calc_brightness(&mut self, light: u8) {
        if light == 100 {
            return;
        }

        if light.gt(&100_u8) {
            let d = (light - 100) * (255 / 100);
            self.r = add_u8(self.r, d);
            self.g = add_u8(self.g, d);
            self.b = add_u8(self.b, d);
            return;
        } else {
            let d = (100 - light) * (255 / 100);
            self.r = minus_u8(self.r, d);
            self.g = minus_u8(self.g, d);
            self.b = minus_u8(self.b, d);
            return;
        }
    }

    pub fn calc_saturation(&mut self, saturation: u8) {
        if saturation == 100 {
            return;
        }

        self.r = calc_saturation(self.r, saturation);
        self.g = calc_saturation(self.g, saturation);
        self.b = calc_saturation(self.b, saturation);
    }
}

fn calc_saturation(i: u8, saturation: u8) -> u8 {
    let m = 127_u8;
    if saturation > 100_u8 {
        let d = saturation - 100;
        return if i > m { add_u8(i, d) } else { minus_u8(i, d) };
    } else {
        let d = 100 - saturation;
        return if i > m {
            minus_u8(i, d)
        } else {
            minus_u8(i, d)
        };
    }
}

pub fn rgb_to_hsv(_r: u8, _g: u8, _b: u8) -> [u16; 3] {
    let r = (_r as f32) / 255_f32;
    let g = (_g as f32) / 255_f32;
    let b = (_b as f32) / 255_f32;

    let max = r.max(r).max(b);
    let min = r.min(r).min(b);

    let v = max;
    let s = if v.eq(&0_f32) { 0_f32 } else { (v - min) / v };
    let mut h = match v {
        r => 60_f32 * (g - b) / (v - min),
        g => 120_f32 + 60_f32 * (b - r) / (v - min),
        b => 240_f32 + 60_f32 * (r - g) / (v - min),
    };
    h = if h.gt(&0_f32) { h } else { 360_f32 + h };

    [h as u16, (s * 100_f32) as u16, (v * 100_f32) as u16]
}
