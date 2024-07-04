import RaveBase from "../lib/rave.base";

export type ServiceHandler = (data: any, rave: RaveBase) => Promise<any>;