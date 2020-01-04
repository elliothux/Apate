//use std::f64;
use js_sys::Uint8ClampedArray;
use wasm_bindgen::prelude::*;
use wasm_bindgen::{JsCast, JsValue};
use web_sys::{console, ImageData};

pub mod color;
pub mod image;
pub mod utils;

#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen(start)]
pub fn main_js() -> Result<(), JsValue> {
    #[cfg(debug_assertions)]
    console_error_panic_hook::set_once();
    Ok(())
}

#[wasm_bindgen()]
pub fn get_image_data(width: u32, height: u32) -> Result<ImageData, JsValue> {
    let document = web_sys::window().unwrap().document().unwrap();
    let canvas = document.get_element_by_id("main-canvas").unwrap();
    let canvas: web_sys::HtmlCanvasElement = canvas
        .dyn_into::<web_sys::HtmlCanvasElement>()
        .map_err(|_| ())
        .unwrap();

    let context = canvas
        .get_context("2d")
        .unwrap()
        .unwrap()
        .dyn_into::<web_sys::CanvasRenderingContext2d>()
        .unwrap();

    let pixels = context
        .get_image_data(0_f64, 0_f64, width.into(), height.into())
        .unwrap();

    Ok(pixels)
}

//#[wasm_bindgen()]
//pub struct ImageData {
//    width: u32,
//    height: u32,
//    data: Box<[u8]>
//}

#[wasm_bindgen()]
pub fn grey(data: Box<[u8]>) -> Result<Box<[u8]>, JsValue> {
    let mut result = Vec::<u8>::new();
    for i in 0..(data.len() / 4) {
        let index = i * 4;
        let avg = data[index] / 3 + data[index + 1] / 3 + data[index + 2] / 3;
        result.push(avg);
        result.push(avg);
        result.push(avg);
        result.push(255);
    }
    Ok(result.into_boxed_slice())
}
