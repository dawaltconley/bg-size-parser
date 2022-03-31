{
    var validUnits = [ '', '%', 'em', 'ex', 'ch', 'rem', 'vw', 'vh', 'vmin', 'vmax', 'px', 'pt', 'pc', 'in', 'mm', 'cm' ]
    var validFunctions = [ 'clamp', 'max', 'min' ]
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

Size = Length / Var / Calc / Math

Var = 'var(' _? name:$CustomProperty fallback:(_? ',' _? $Parenthetical)? _? ')'  {
    return {
        variable: text(),
        name: name,
        fallback: fallback ? fallback[3] : undefined
    }
}

CustomProperty = '--' [A-z0-9_-]*

// TODO should improve return object and parse the contents of math functions when possible
Math = func:[a-z]+ & {
    return validFunctions.indexOf(func.join('')) >= 0
} '(' Parenthetical ')' {
    let type = func.join('');
    return {
        [type]: text()
    }
}

Calc = 'calc(' Parenthetical ')' {
    return {
        calculation: text() // TODO this property should be called something else
    }
}

Parenthetical = (!')'.)*

Length = i:( 'auto' / Number ) unit:[a-z%]* & {
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
