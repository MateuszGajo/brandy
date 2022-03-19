import {Container} from "typedi";
import LoggerInstance from "./logger"

export default({models}:{models:{name:string,model:any}[]})=>{
    try{
        models.forEach(m => {
            Container.set(m.name, m.model);
          });
        Container.set("logger",LoggerInstance);
    }catch(e){
        LoggerInstance.error("Error on dependancy injector loader: ",e);
        throw e;
    }
}