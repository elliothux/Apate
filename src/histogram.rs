use wasm_bindgen::prelude::*;
use crate::utils::normalize_u8;

#[wasm_bindgen()]
pub fn generate_histogram_data(image_data: &[u8], width: usize, height: usize) -> Box<[u32]> {
    let mut max = 1u32;
    let mut rs = vec![0_u32; width];
    let mut gs = vec![0_u32; width];
    let mut bs = vec![0_u32; width];

    for index in 0..(image_data.len() / 4) {
        let i = index * 4;
        let r = normalize_u8(image_data[i], width) as usize;
        let g = normalize_u8(image_data[i + 1], width) as usize;
        let b = normalize_u8(image_data[i + 2], width) as usize;

        let ro = rs[r] + 1;
        rs[r] = ro;
        if ro > max { max = ro; }

        let go = gs[g] + 1;
        gs[g] = go;
        if go > max { max = go; }

        let bo = bs[b] + 1;
        bs[b] = bo;
        if bo > max { max = bo; }
    }

    rs.append(&mut gs);
    rs.append(&mut bs);
    rs.push(max);
    rs.into_boxed_slice()
}
