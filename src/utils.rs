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

pub fn clamp(value: f32, min: f32, max: f32) -> f32 {
    if value > max {
        return max;
    }

    if value < min {
        return min;
    }

    value
}

pub fn adjacent(i: f32, min: f32, max: f32) -> (f32, f32, f32) {
    let v1 = clamp(i.floor(), min, max);
    let v2 = clamp(i.ceil(), min, max);
    let d = i - v1;
    (v1, v2, d)
}

pub fn linear_interpolation(v1: f32, v2: f32, d: f32) -> f32 {
    v1 + (v2 - v1) * d
}

pub fn normalize_u8(value: u8, n: u32) -> u8 {
    if n == 255 {
        value
    } else {
        ((value as f32) / 255_f32 * (n as f32)).round() as u8
    }
}

pub fn normalize(value: u32, max: u32, n: u32) -> u32 {
    value * n / max
}
