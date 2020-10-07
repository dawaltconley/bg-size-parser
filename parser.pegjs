{
    var validUnits = [ '', '%', 'em', 'ex', 'ch', 'rem', 'vw', 'vh', 'vmin', 'vmax', 'px', 'pt', 'pc', 'in', 'mm', 'cm' ]
}

Multiple = v:Value ',' _ vNext:Multiple { return [v].concat(vNext) }
    / v:Value { return [v] }
    / '' { return [] }

Value = Keyword / Dimensions

Dimensions = w:Size h:( _ Size )? {
    var d = { width: w };
    return {
        width: w,
        height: h ? h[1] : { size: 'auto' }
    }
}

Size = i:( 'auto' / Number ) unit:[a-z%]* & {
    return validUnits.indexOf(unit.join('')) >= 0
} {
    return {
        size: i,
        unit: i === 'auto' ? undefined : ( unit.join('') || 'px' )
    }
}

Keyword = ( 'cover' / 'contain' / 'inherit' / 'initial' / 'unset' ) {
    return {
        keyword: text()
    }
}

Number = [0-9]* ('.'? [0-9]+)? {
    return Number(text());
}

_ = ' '+
