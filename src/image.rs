//use std::f64;
use wasm_bindgen::prelude::*;
use wasm_bindgen::{JsValue, Clamped};
use js_sys::{Uint8ClampedArray};

#[wasm_bindgen()]
pub struct EditData {

}

#[wasm_bindgen()]
pub struct Image {
    pub width: u32,
    pub height: u32,
    data: Box<[u8]>,
//    hsl_data: Box<[u8]>
}

#[wasm_bindgen()]
impl Image {
    pub fn from(width: u32, height: u32, data: Box<[u8]>) -> Image {
        let mut result = Vec::<u8>::new();
        for i in 0..(data.len() / 4) {
            // Drop useless alpha data for saving memories
            let index = i * 4;
            result.push(data[index]);
            result.push(data[index + 1]);
            result.push(data[index + 2]);
        }
        Image {
            width,
            height,
            data: result.into_boxed_slice()
        }
    }

    pub fn get_data(&self) -> Box<[u8]> {
        self.data.clone()
    }

    pub fn to_data_with_alpha(&self) -> Box<[u8]> {
        let mut result = Vec::<u8>::new();
        for i in 0..(self.data.len() / 3) {
            let index = i * 3;
            result.push(self.data[index]);
            result.push(self.data[index + 1]);
            result.push(self.data[index + 2]);
            result.push(255);
        }
        result.into_boxed_slice()
    }
}
