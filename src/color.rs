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

        let gray =
            (0.2989 * (self.r as f32) + 0.5870 * (self.g as f32) + 0.1140 * (self.b as f32)) as u8;

        self.r = calc_saturation(self.r, saturation, gray);
        self.g = calc_saturation(self.g, saturation, gray);
        self.b = calc_saturation(self.b, saturation, gray);
    }

    pub fn calc_temperature(&mut self, temperature: u8) {
        if temperature == 100 {
            return;
        }

        if temperature > 100 {
            let d = temperature - 100;
            self.r = add_u8(self.r, d);
            self.b = minus_u8(self.b, d)
        } else {
            let d = 100 - temperature;
            self.r = minus_u8(self.r, d);
            self.b = add_u8(self.b, d);
        }
    }

    pub fn calc_tint(&mut self, tint: u8) {
        if tint == 100 {
            return;
        }

        if tint > 100 {
            let d = tint - 100;
            self.g = add_u8(self.g, d);
        } else {
            let d = 100 - tint;
            self.g = minus_u8(self.g, d);
        }
    }

    pub fn calc_exposure(&mut self, exposure: u8) {
        if exposure == 100 {
            return;
        }

        let v = (exposure as f32 - 100_f32) / 50_f32;
        let d = 2_f32.powf(v);
        self.r = calc_exposure(self.r, d);
        self.g = calc_exposure(self.g, d);
        self.b = calc_exposure(self.b, d);
    }
}

fn calc_saturation(i: u8, saturation: u8, grey: u8) -> u8 {
    let m = 127_u8;
    let mut result: f32 = 0_f32;

    if saturation > 100_u8 {
        let v = (saturation - 100) as f32 / 100_f32;
        result = i as f32 * (1_f32 + v) - grey as f32 * v;
    } else {
        let v = (100 - saturation) as f32 / 100_f32;
        result = i as f32 * (1_f32 - v) + grey as f32 * v;
    }

    return if result < 0_f32 {
        0_u8
    } else if result > 255_f32 {
        255_u8
    } else {
        result as u8
    };
}

fn calc_exposure(i: u8, v: f32) -> u8 {
    let result = i as f32 * v;
    if result > 255_f32 {
        255_u8
    } else {
        result as u8
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
