import { HTTP } from '@cerbos/http';
import { Injectable } from '@nestjs/common';
import { CERBOS_ACTIONS } from 'src/common/CerbosAction';

@Injectable()
export class CerbosService {
    private cerbos = new HTTP("http://127.0.0.1:3592");

    async commonVerify(user, resource, action) {
        const cerbosRequest = {
            "principal": {
                "id": "" + user.id,
                "roles": [user.role],
                "attr": {}
            },
            "resource": {
                "kind": resource,
                id: "" + user.id,
                "instances": {
                    [user.id]: {
                        "attr": {}
                    }
                }
            },
            "action": CERBOS_ACTIONS[action]
        }
        return await this.cerbos.isAllowed(cerbosRequest);
    }

    async updateAction(user, resource, action, record){
        const cerbosRequest = {
            "principal": {
                "id": "" + user.id,
                "roles": [user.role],
                "attr": {}
            },
            "resource": {
                "kind": resource,
                id: "" + record.employee_id,
                "instances": {
                    [user.id]: {
                        "attr": {}
                    }
                }
            },
            "action": CERBOS_ACTIONS[action]
        }

        if (user.role == 'manager') {
            cerbosRequest.principal.attr = {
                "sub_employees": user?.sub_employees?.map((e) => ""+ e) ?? []
            };
            cerbosRequest.resource.instances = {
                [record.employee_id]: {
                    "attr": {}
                }
            }
        }
        console.log("cerbosRequest", JSON.stringify(cerbosRequest));
        return await this.cerbos.isAllowed(cerbosRequest);
    }
}
