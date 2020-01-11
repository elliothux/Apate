use wasm_bindgen::prelude::*;
use wasm_bindgen::{JsValue};

pub mod color;
pub mod image;
pub mod utils;
pub mod lut;
pub mod histogram;
pub mod resampling;

#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen(start)]
pub fn main_js() -> Result<(), JsValue> {
    #[cfg(debug_assertions)]
    console_error_panic_hook::set_once();
    Ok(())
}
