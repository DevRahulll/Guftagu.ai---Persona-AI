import HiteshPersona from "./HiteshChoudhary.js";
import PiyushPersona from "./PiyushGarg.js";

const personaRegistry = {
    [HiteshPersona.id]: HiteshPersona,
    [PiyushPersona.id]: PiyushPersona,
};

export function getPersonaConfig(personaId) {
    const persona = personaRegistry[personaId];
    if (!persona) {
        throw new Error(`Unknown personaId: ${personaId}`);
    }

    return persona;
}

export default personaRegistry;
