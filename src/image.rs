use std::{thread};
use wasm_bindgen::prelude::*;
use wasm_bindgen::{JsValue, Clamped};
use js_sys::{Uint8ClampedArray};
use crate::color::{RGB, rgb_to_hsv};

#[wasm_bindgen()]
#[derive(Copy, Clone)]
pub struct EditData {
    pub brightness: u8,
    pub saturation: u8
}

type ImageDataRow = Vec<RGB>;
type ImageData = Vec<ImageDataRow>;

#[wasm_bindgen()]
pub struct Image {
    pub width: u32,
    pub height: u32,
    data: ImageData,

    pub edit_data: EditData,
}

#[wasm_bindgen()]
impl Image {
    pub fn from(width: u32, height: u32, data: Box<[u8]>) -> Image {
        let mut image_data= Vec::<ImageDataRow>::new();

        for y in 0..height {
            let mut row = Vec::<RGB>::new();

            for x in 0..width {
                let i = (x as usize) * 4 + (width * 4 * y) as usize;
                row.push(RGB {
                    r: data[i],
                    g: data[i + 1],
                    b: data[i + 2],
                });
            }

            image_data.push(row);
        }

        Image {
            width,
            height,
            data: image_data,
            edit_data: EditData {
                brightness: 100u8,
                saturation: 100u8,
            }
        }
    }

    pub fn to_array(&self) -> Box<[u8]> {
        let mut result = Vec::<u8>::new();
        for row in &self.data {
            for color in row {
                result.push(color.r);
                result.push(color.g);
                result.push(color.b);
                result.push(255_u8);
            }
        }
        result.into_boxed_slice()
    }

    fn get_current_rgb(&self, color: &RGB) -> RGB {
        let mut current_color = color.clone();
        let handler = thread::spawn(|| {
            &current_color.calc_brightness(self.edit_data.brightness);
        });
        &current_color.calc_saturation(self.edit_data.saturation);
        current_color
    }

    pub fn get_current_data_array(&self) -> Box<[u8]> {
        let mut result = Vec::<u8>::new();
        for row in &self.data {
            for color in row {
                let current_color = self.get_current_rgb(&color);
                result.push(current_color.r);
                result.push(current_color.g);
                result.push(current_color.b);
                result.push(255_u8);
            }
        }
        result.into_boxed_slice()
    }

    pub fn set_brightness(&mut self, brightness: u8) {
        self.edit_data.brightness = brightness;
    }

    pub fn set_saturation(&mut self, saturation: u8) {
        self.edit_data.saturation = saturation;
    }
}
