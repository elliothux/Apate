use std::f32;
use wasm_bindgen::prelude::*;

pub type LutDataItem = [f32; 3];

#[wasm_bindgen()]
#[derive(Clone)]
pub struct ThreeDirectionLookUpTable {
    pub size: u32,
    data: Vec<Vec<Vec<LutDataItem>>>
}

#[wasm_bindgen()]
impl ThreeDirectionLookUpTable {
    pub fn from_string(raw_str: String) -> ThreeDirectionLookUpTable {
        let mut size = 0_u32;
        let mut lut_data = Vec::<LutDataItem>::new();

        let lines: Vec<&str> = raw_str.split("\n").collect();
        for mut line in lines {
            line = line.trim();

            if line.len().eq(&0) {
                continue;
            }

            if line.chars().nth(0).unwrap().eq(&'#') {
                continue;
            }

            let parts: Vec<&str> = line.split(" ").collect();
            match parts[0] {
                "LUT_3D_SIZE" => size = parts[1].parse::<u32>().unwrap(),
                _ => lut_data.push(parse_data_item(&parts))
            }
        }

        if size.eq(&0_u32) {
            panic!("Lut size not allow to be zero.");
        }

        let len = (size * size * size) as usize;
        if !lut_data.len().eq(&len) {
            panic!("Lut size mismatch with data length.");
        }

        let mut data = Vec::<Vec<Vec<LutDataItem>>>::new();
        for z in 0..size {
            let mut layer = Vec::<Vec<LutDataItem>>::new();
            for y in 0..size {
                let mut row = Vec::<LutDataItem>::new();
                for x in 0..size {
                    let index = size * size * z + size * y + x;
                    row.push(lut_data[index as usize])
                }
                layer.push(row);
            }
            data.push(layer);
        }

        ThreeDirectionLookUpTable {
            size,
            data
        }
    }
}

fn parse_data_item(parts: &Vec<&str>) -> LutDataItem {
    let x = parts[0].parse::<f32>().unwrap();
    let y = parts[1].parse::<f32>().unwrap();
    let z = parts[2].parse::<f32>().unwrap();
    [x, y, z]
}

pub fn get_lut_value(lut: &ThreeDirectionLookUpTable, x: usize, y: usize, z: usize) -> (f32, f32, f32) {
    let v =     lut.data[z][y][x];
    (v[0], v[1], v[2])
}
