import { action, makeAutoObservable, runInAction} from "mobx";
import { Position, PositionCreate } from '../models/position';
import agent from "../api/agent";

export default class PositionStore {
    positions: Position[]=[];
   createdEmployee: Position | undefined = undefined;
   loaded = false;



    constructor() {
       makeAutoObservable(this, {
       })
    }

    loadPositions = async () => {
        this.setLoaded(true);
        try {
            const positions = await agent.Positions.list();
            this.positions = positions;
            this.setLoaded(true);
            
        } catch (error) {
            console.log(error);
            this.setLoaded(true);
        }
    }
    

    setLoaded = (state: boolean) => {
        this.loaded = state;       
    }

    createPosition = async (position: PositionCreate) =>{
        this.loaded = true;
        try {
            await agent.Positions.create(position);
            
            runInAction(()=>{
                agent.Departments.list(); 
                this.loaded = false;
            })
        } catch (error){
            console.log(error);
            runInAction(()=>{
                this.loaded = false;
            })

        }
    }



}