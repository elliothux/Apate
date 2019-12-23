//use std::f64;
use wasm_bindgen::prelude::*;
use wasm_bindgen::{JsValue, JsCast};
use web_sys::{console, ImageData};
use js_sys::{Uint8ClampedArray};

pub mod color;

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

    let pixels = context.get_image_data(0_f64, 0_f64, width.into(), height.into()).unwrap();

    Ok(pixels)
}

