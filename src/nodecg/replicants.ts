import { Graphics } from './generated/graphics';
import { Progress } from './generated/progress';
import { Relay } from './generated/relay';

type ReplicantMap = {
    graphics: Graphics,
    progress: Progress,
    relay: Relay
};

export {
    ReplicantMap,
    Graphics,
    Progress,
    Relay
};