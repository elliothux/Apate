use wasm_bindgen::prelude::*;
use crate::utils::{normalize_u8, normalize, clamp};
use crate::resampling::{ResamplingData};

#[wasm_bindgen()]
pub fn generate_histogram_data(
    image_data: &[u8],
    histogram_width: u32,
    histogram_height: u32,
    image_width: u32,
    image_height: u32,
    target_width: u32,
    target_height: u32
) -> Box<[u32]> {
    let resampling = ResamplingData::from(image_data, image_height, image_height, target_width, target_height);
    generate_histogram_data_with_resampling(&resampling, histogram_width, histogram_height)
}

fn generate_histogram_data_with_resampling(
    resampling: &ResamplingData,
    histogram_width: u32,
    histogram_height: u32
) -> Box<[u32]> {
    let ResamplingData { width, height, data } = resampling;

    let mut max = 1u32;
    let mut result = vec![0_u32; histogram_width as usize * 3];

    for index in 0..(data.len() / 4) {
        let i = index * 4;
        let r = normalize_u8(data[i], histogram_width) as usize;
        let g = normalize_u8(data[i + 1], histogram_width) as usize;
        let b = normalize_u8(data[i + 2], histogram_width) as usize;

        let index_r = r;
        let ro = result[index_r] + 1;
        result[index_r] = ro;
        if ro > max { max = ro; }

        let index_g = histogram_width as usize + g;
        let go = result[index_g] + 1;
        result[index_g] = go;
        if go > max { max = go; }

        let index_b = 2 * histogram_width as usize + b;
        let bo = result[index_b] + 1;
        result[index_b] = bo;
        if bo > max { max = bo; }
    }

    for index in 1..result.len() {
        let value = result[index];
        if value != 0 {
            let v = normalize(value, max, histogram_height);
            result[index] = clamp(v * 2_u32, 10, histogram_height);
        }
    }

    result.into_boxed_slice()
}
