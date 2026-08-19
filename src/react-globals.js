// Les fichiers de src/ partagent la portée globale (pas de bundler ni d'imports
// ES) : les hooks React sont donc déstructurés ici, une seule fois.
const { useState, useEffect, useMemo, useRef, useContext } = React;
