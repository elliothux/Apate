use wasm_bindgen::prelude::*;
use crate::utils::normalize_u8;

pub struct ResamplingData {
    pub data: Vec<u8>,
    pub width: usize,
    pub height: usize,
}

pub fn resampling_image_data(image_data: &[u8], width: u32, height: u32, target_width: u32, target_height: u32) -> ResamplingData {
    ResamplingData {
        data: nearest_neighbor(image_data, width, height, target_width, target_height),
        width: target_width as usize,
        height: target_height as usize,
    }
}

fn nearest_neighbor(data: &[u8], width: u32, height: u32, target_width: u32, target_height: u32) -> Vec<u8> {
    let mut result = Vec::<u8>::new();

    let width_scale = width as f32 / target_width as f32;
    let height_scale = height as f32 / target_height as f32;

    for y in 0..target_height {
        for x in 0..target_width {
            let src_x = (x as f32 * width_scale).floor() as usize;
            let src_y = (y as f32 * height_scale).floor() as usize;
            let index = ((src_y * width as usize) + src_x) * 4;
            result.push(data[index]);
            result.push(data[index + 1]);
            result.push(data[index + 2]);
        }
    }

    result
}

//fn bilinear_interpolation(data: &[u8], width: u32, height: u32, target_width: u32, target_height: u32) -> Vec<u8> {
//    let mut result = Vec::<u8>::new();
//    for y in 0..target_height {
//        for x in 0..target_width {
//            let src_x = (x as f32) * (width as f32 / target_width as f32);
//            let src_y = (y as f32) * (height as f32 / target_height as f32);
//
//            let x_min = src_x.floor() as u32;
//            let y_min = src_y.floor() as u32;
//
//            let x_max = (src_x.ceil() as u32).min(width - 1);
//            let y_max = (src_y.ceil() as u32).min(height - 1);
//
//            result.push(interpolate_vertical(data, width, 0, src_x, x_min, x_max, src_y, y_min, y_max))
//        }
//    }
//    result
//}
//
//fn interpolate_vertical(data: &[u8], width: u32, offset: u32, x: f32, x_min: u32, x_max: u32, y: f32, y_min: u32, y_max: u32) -> u8 {
//    let v_min = interpolateHorizontal(data, offset, x, y_min, x_min, x_max);
//    if y_min == y_max {
//        v_min as u8
//    } else {
//        let v_max = interpolate_horizontal(data, width, offset, x, y_max, x_min, x_max);
//        interpolate(y, y_min, y_max, v_min, _mMax)
//    }
//}
//
//fn interpolate_horizontal(data: &[u8], width: u32, offset: u32, x: f32, y: f32, x_min: u32, x_max: u32) -> u8 {
//    let index = (((y * width + x_min) * 4) + offset) as usize;
//    let v_min = data[index];
//    if x_min == x_max {
//        v_min
//    } else {
//        let index = (((y * width + x_max) * 4) + offset) as usize;
//        let v_max = data[index];
//        interpolate(x, x_min, x_max, v_min, v_max)
//    }
//}
//
//fn interpolate(k: f32, k_min: u32, k_max: u32, v_min: u8, v_max: u8) -> u8 {
//    ((k - k_min as f32) * v_max as f32 + (k_max as f32 - k) * v_min as f32).round() as u8
//}
