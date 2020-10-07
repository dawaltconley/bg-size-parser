Value = Keyword / ( Length ( _ Length )? )

Length = Percent / Relative / Absolute / 'auto'

Keyword = 'cover' / 'contain' / 'inherit' / 'initial' / 'unset'

Percent "percent"
  = i:Integer '%' { return i / 100; }

Relative = i:Integer ('em' / 'ex' / 'ch' / 'rem' / 'vw' / 'vh' / 'vmin' / 'vmax')

Absolute = i:Integer ('px' / 'pt' / 'pc' / 'in' / 'mm' / 'cm')

Integer "integer"
  = [0-9]+ { return parseInt(text(), 10); }

_ "whitespace"
  = [ ]+
