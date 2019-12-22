//use std::f64;
use wasm_bindgen::prelude::*;
use wasm_bindgen::{JsValue, JsCast};
use web_sys::{console, ImageData};
use js_sys::{Uint8ClampedArray};

#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;


#[wasm_bindgen(start)]
pub fn main_js() -> Result<(), JsValue> {
    #[cfg(debug_assertions)]
    console_error_panic_hook::set_once();

    console::log_1(&JsValue::from_str("Hello world!"));

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

    let pixels = context.get_image_data(0_f64, 0_f64, width.into(), height.into()).unwrap();

    Ok(pixels)
}

#[wasm_bindgen()]
pub fn get_grey_data(pixels: wasm_bindgen::Clamped<Vec<u8>>) -> Result<Uint8ClampedArray, JsValue> {
    let new_pixels: Uint8ClampedArray = Uint8ClampedArray::new_with_length(pixels.len() as u32);
    for i in 0..(pixels.len() / 4) {
        let index = i * 4;
        let value:u8 = ((pixels[index] as u16 + pixels[index + 1] as u16 + pixels[index + 2] as u16) / 3_u16) as u8;
//        console::log_1(&JsValue::from_f64(value.into()));
//        &new_pixels.set(&value.into(), index as u32);
//        &new_pixels.set(&value.into(), (index + 1) as u32);
//        &new_pixels.set(&value.into(), (index + 2) as u32);
//        &new_pixels.set(&255.into(), (index + 3) as u32);
    }

    Ok(new_pixels)
}
