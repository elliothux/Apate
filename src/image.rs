//use std::f64;
use wasm_bindgen::prelude::*;
use wasm_bindgen::{JsValue, Clamped};
use js_sys::{Uint8ClampedArray};
use crate::color;

#[wasm_bindgen()]
pub struct EditData {

}

#[wasm_bindgen()]
pub struct Image {
    pub width: u32,
    pub height: u32,
    rgb_data: Vec<u8>,
    hsv_data: Vec<u16>
}

#[wasm_bindgen()]
impl Image {
    pub fn from(width: u32, height: u32, data: Box<[u8]>) -> Image {
        let mut result = Vec::<u8>::new();
        let mut hsv_result = Vec::<u16>::new();
        for i in 0..(data.len() / 4) {
            // Drop useless alpha data for saving memories
            let index = i * 4;
            let r = data[index];
            let g = data[index + 1];
            let b = data[index + 2];

            result.push(r);
            result.push(g);
            result.push(b);

            let [h, s, v] = color::rgb_to_hsv(r, g, b);
            hsv_result.push(h);
            hsv_result.push(s);
            hsv_result.push(v);
        }

        Image {
            width,
            height,
            rgb_data: result,
            hsv_data: hsv_result
        }
    }

    pub fn to_data_with_alpha(&self) -> Box<[u8]> {
        let mut result = Vec::<u8>::new();
        for i in 0..(self.rgb_data.len() / 3) {
            let index = i * 3;
            result.push(self.rgb_data[index]);
            result.push(self.rgb_data[index + 1]);
            result.push(self.rgb_data[index + 2]);
            result.push(255);
        }
        result.into_boxed_slice()
    }

    pub fn get_rgb_data(&self) -> Box<[u8]> {
        self.rgb_data.clone().into_boxed_slice()
    }

    pub fn get_hsv_data(&self) -> Box<[u16]> {
        self.hsv_data.clone().into_boxed_slice()
    }
}
