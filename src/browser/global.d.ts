import {CreateNodecgInstance, CreateNodecgConstructor} from 'ts-nodecg/browser';
import {ReplicantMap} from '../nodecg/replicants';
import {MessageMap} from '../nodecg/messages';

declare global {
	interface Window {
        nodecg: CreateNodecgInstance<
            'relay-race-layout',
			Object,
			ReplicantMap,
			MessageMap
		>;
        NodeCG: CreateNodecgConstructor<
            'relay-race-layout',
			Object,
			ReplicantMap,
			MessageMap
		>;
	}
}