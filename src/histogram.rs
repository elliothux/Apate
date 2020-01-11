use wasm_bindgen::prelude::*;
use crate::utils::normalize_u8;
use crate::resampling::{ResamplingData, resampling_image_data};

#[wasm_bindgen()]
pub fn generate_histogram_data(image_data: &[u8], w: u32, h: u32, target_width: u32, target_height: u32) -> Box<[u32]> {
    let resampling = resampling_image_data(image_data, w, h, target_width, target_height);
    generate_histogram_data_with_resampling(&resampling)
}

fn generate_histogram_data_with_resampling(resampling: &ResamplingData) -> Box<[u32]> {
    let ResamplingData { width, height, data } = resampling;

    let mut max = 1u32;
    let mut result = vec![0_u32; width * 3 + 2];

    for index in 0..(data.len() / 4) {
        let i = index * 4;
        let r = normalize_u8(data[i], width.clone()) as usize;
        let g = normalize_u8(data[i + 1], width.clone()) as usize;
        let b = normalize_u8(data[i + 2], width.clone()) as usize;

        let index_r = r + 1;
        let ro = result[index_r] + 1;
        result[index_r] = ro;
        if ro > max { max = ro; }

        let index_g = width + g + 1;
        let go = result[index_g] + 1;
        result[index_g] = go;
        if go > max { max = go; }

        let index_b = 2 * width + b + 1;
        let bo = result[index_b] + 1;
        result[index_b] = bo;
        if bo > max { max = bo; }
    }

    result[0] = max;
    result.into_boxed_slice()
}
