use std::f32;
use wasm_bindgen::prelude::*;

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

pub fn hsv_to_rgb(_r: u8, _g: u8, _b: u8) -> [u16; 3] {
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

