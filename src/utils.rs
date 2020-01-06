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

pub fn clamp_u8(i: f32) -> u8 {
    if i > 255_f32 {
        255_u8
    } else if i < 0_f32 {
        0_u8
    } else {
        i as u8
    }
}

//pub fn interp3d(arr: &[u8], x: usize, y: usize, z: usize, size_x: usize, size_y: usize, size_z: usize)
