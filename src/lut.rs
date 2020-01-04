use num_traits::Float;
use slice_of_array::prelude::*;
use std::num::ParseFloatError;
use std::str::FromStr;
use wasm_bindgen::prelude::*;

#[wasm_bindgen()]
#[derive(Copy, Clone, Debug)]
pub struct CubeLut {
    pub title: String,
    pub kind: LutKind,
    pub domain_min: [f32; 3],
    pub domain_max: [f32; 3],
    pub size: usize,
    pub data: Vec<[f32; 3]>,
}

#[wasm_bindgen()]
#[derive(Copy, Clone, Debug, PartialEq)]
pub enum LutKind {
    One,
    Three,
}

#[wasm_bindgen()]
#[derive(Copy, Clone, Debug, PartialEq)]
pub enum LutError {
    SizeLine,
    Title,
    Size(usize),
    DomainMin(usize),
    DomainMax(usize),
    DataRed(usize),
    DataGreen(usize),
    DataBlue(usize),
    DataLine(usize),
}

#[wasm_bindgen()]
impl CubeLut {
    pub fn flatten_data(&self) -> &[T] {
        self.data.flat()
    }

    pub fn from_str(txt: &str) -> Result<Self, LutError> {
        let mut title: Option<String> = None;
        let mut kind: Option<LutKind> = None;
        let mut domain_min = [T::zero(); 3];
        let mut domain_max = [T::one(); 3];
        let mut size: usize = 0;

        //non-empty and non-comment lines
        let lines = txt.lines().filter(|line| match line.chars().next() {
            None => false,
            Some('#') => false,
            _ => true,
        });

        let mut data: Vec<[T; 3]> = Vec::with_capacity(lines.clone().count());

        for (line_number, line) in lines.enumerate() {
            let mut parts = line.split_whitespace();
            let first = parts.next();

            let mut get_size = |line_number| -> Result<usize, LutError> {
                parts
                    .next()
                    .and_then(|value| value.parse::<usize>().ok())
                    .ok_or(LutError::Size(line_number))
            };

            match first {
                Some("TITLE") => {
                    title = Some(parts.collect::<Vec<&str>>().join(" "));
                }
                Some("DOMAIN_MIN") => match parse_domain(parts) {
                    None => return Err(LutError::DomainMin(line_number)),
                    Some(values) => domain_min.copy_from_slice(&values),
                },
                Some("DOMAIN_MAX") => match parse_domain(parts) {
                    None => return Err(LutError::DomainMax(line_number)),
                    Some(values) => domain_max.copy_from_slice(&values),
                },
                Some("LUT_1D_SIZE") => {
                    kind = Some(LutKind::One);
                    size = get_size(line_number)?;
                }
                Some("LUT_3D_SIZE") => {
                    kind = Some(LutKind::Three);
                    size = get_size(line_number)?;
                }
                _ => match (first, parts.next(), parts.next()) {
                    (Some(r), Some(g), Some(b)) => {
                        let r = r.parse::<T>().map_err(|_| LutError::DataRed(line_number))?;
                        let g = g
                            .parse::<T>()
                            .map_err(|_| LutError::DataGreen(line_number))?;
                        let b = b
                            .parse::<T>()
                            .map_err(|_| LutError::DataBlue(line_number))?;
                        data.push([r, g, b]);
                    }
                    _ => {
                        return Err(LutError::DataLine(line_number));
                    }
                },
            }
        }

        if size == 0 {
            return Err(LutError::SizeLine);
        }

        let kind = kind.unwrap(); //there can't be a valid kind unless there's a valid size

        let title = title.ok_or(LutError::Title)?;

        Ok(Self {
            title,
            kind,
            domain_min,
            domain_max,
            size,
            data,
        })
    }
}

fn parse_domain<'a, N: Float + FromStr<Err = ParseFloatError>, T: Iterator<Item = &'a str>>(
    parts: T,
) -> Option<Vec<N>> {
    let values = parts
        .map(|value| value.parse::<N>())
        .collect::<Result<Vec<N>, std::num::ParseFloatError>>();

    match values {
        Ok(values) => {
            if values.len() < 3 {
                None
            } else {
                Some(values)
            }
        }
        Err(_) => None,
    }
}
