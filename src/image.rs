use wasm_bindgen::prelude::*;
use crate::color::{RGB};

#[wasm_bindgen()]
#[derive(Copy, Clone)]
pub struct EditData {
    pub saturation: u8,
    pub vibrance: u8,
    pub temperature: u8,
    pub tint: u8,
    pub brightness: u8,
    pub exposure: u8,
    pub contrast: u8,
    pub highlight: u8,
    pub shadow: u8,
}

type ImageDataRow = Vec<RGB>;
type ImageData = Vec<ImageDataRow>;

#[wasm_bindgen()]
pub struct Image {
    pub width: u32,
    pub height: u32,
    pub edit_data: EditData,

    data: ImageData,
    original_data: ImageData,
}

#[wasm_bindgen()]
impl Image {
    pub fn from(width: u32, height: u32, data: Box<[u8]>) -> Image {
        let mut image_data = Vec::<ImageDataRow>::new();

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
            data: image_data.clone(),
            original_data: image_data,
            edit_data: EditData {
                saturation: 100u8,
                vibrance: 100u8,
                temperature: 100u8,
                tint: 100_u8,
                brightness: 100u8,
                exposure: 100_u8,
                contrast: 100_u8,
                highlight: 100_u8,
                shadow: 100_u8,
            },
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
        &current_color.calc_brightness(self.edit_data.brightness);
        &current_color.calc_saturation(self.edit_data.saturation);
        &current_color.calc_temperature(self.edit_data.temperature);
        &current_color.calc_tint(self.edit_data.tint);
        &current_color.calc_exposure(self.edit_data.exposure);
        &current_color.calc_contrast(self.edit_data.contrast);
        &current_color.calc_highlight_and_shadow(self.edit_data.highlight, self.edit_data.shadow);
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


    pub fn apply_lut(&mut self, lut: &[u8], size: u32) {
//        for (y, row) in self.data.iter().enumerate() {
//            for (x, color) in row.iter().enumerate() {
//                let RGB { r, g, b} = self.get_current_rgb(&color);
//                let ri = r as u32;
//                let gi = g as u32;
//                let bi = b as u32;
//
//            }
//        }
    }

    pub fn set_saturation(&mut self, value: u8) {
        self.edit_data.saturation = value;
    }

    pub fn set_temperature(&mut self, value: u8) {
        self.edit_data.temperature = value;
    }

    pub fn set_tint(&mut self, value: u8) {
        self.edit_data.tint = value;
    }

    pub fn set_vibrance(&mut self, value: u8) {
        self.edit_data.vibrance = value;
    }

    pub fn set_brightness(&mut self, value: u8) {
        self.edit_data.brightness = value;
    }

    pub fn set_exposure(&mut self, value: u8) {
        self.edit_data.exposure = value;
    }

    pub fn set_contrast(&mut self, value: u8) {
        self.edit_data.contrast = value;
    }

    pub fn set_highlight(&mut self, value: u8) {
        self.edit_data.highlight = value;
    }

    pub fn set_shadow(&mut self, value: u8) {
        self.edit_data.shadow = value;
    }
}
