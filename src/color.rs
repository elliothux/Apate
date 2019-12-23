use std::f32;
use wasm_bindgen::prelude::*;
use wasm_bindgen::{JsValue};

//#[wasm_bindgen()]
//pub fn rgb_to_hsl(r: u8, g: u8, b: u8) -> Result<[u8; 3], JsValue> {
//    let _r:f32 = r as f32 / 255_f32;
//    let _g:f32 = g as f32 / 255_f32;
//    let _b:f32 = b as f32 / 255_f32;
//
//    let max = _r.max(_g.max(_b));
//    let min = _r.min(_g.min(_b));
//
//    let mut h = 0_f32;
//    let mut s = 0_f32;
//    let mut l: f32 = (max + min) / 2_f32;
//
//    if max.eq(&min) {
//        h = 0_f32;
//        s = 0_f32;
//    } else {
//        let d = max - min;
//        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
//    }

//    let result: [u8; 3] = [h.into(), s.into(), l.into()];
//    Ok(result)
//}
