pub fn add_u8(a: u8, b: u8) -> u8 {
    let result = a as u16 + b as u16;
    if result > 255 {
        255_u8
    } else {
        result as u8
    }
}

pub fn minus_u8(a: u8, b: u8) -> u8 {
    let result = a as i16 - b as i16;
    if result < 0 {
        0_u8
    } else {
        result as u8
    }
}
