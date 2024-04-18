import Project from "../schema/project";
import { UserInputError } from 'apollo-server-core';
import { GraphQLError } from 'graphql/error/GraphQLError';

export interface ResponseProject {
  pag:number,
  total:number,
  data:any[]
}

// that class only can be extended
export  class ProjectRepository { 
  constructor() {
  }
  
  public get(id:string): Promise<typeof Project> {
    return new Promise((resolve,reject) => {
      let resp:ResponseProject = {
        pag: 0,
        total: 0,
        data: []
      }
      resolve(resp)
    })
  }

  public getAll(): Promise<ResponseProject> {
    return new Promise((resolve,reject) => {   
      let resp:ResponseProject = {
        pag: 0,
        total: 0,
        data: [Project.find()],
      }
      resolve(resp)
    })
  }

  public getByUser(): Promise<ResponseProject> {
    return new Promise((resolve,reject) => {    
      let resp:ResponseProject = {
        pag: 0,
        total: 0,
        data: []
      }
      resolve(resp)
    })
  }

  public getByNameAndDate(): Promise<ResponseProject> {
    return new Promise((resolve,reject) => {  
      let resp:ResponseProject = {
        pag: 0,
        total: 0,
        data: [{

        }
        ]
      }
      resolve(resp)
    })
  }

  
  public async create(data:any): Promise<typeof Project> {

    const project = new Project({
        client: data.client,
        name: data.name,
        description: data.description,
      });
      return project.save().catch((error: any) => {
        throw new Error('Error.'), error;       
      });

   
  }

  public async update(data:any): Promise<typeof Project>{
    const { _id, ...updates } = data;
    console.log (data)
    const project = await Project.findByIdAndUpdate(_id, updates, {
      new: true,
    });
    if (!project) {
      throw new UserInputError("Project not found", {
        invalidArgs: data,
      });
    }
    return project;
  }

  public async delete(data:any): Promise<typeof Project>{
    const project = await Project.findByIdAndUpdate(data._id, { deleted: true });
    if (project) {
      return "Proyecto Borrado";
    } else {
      throw new GraphQLError("Error eliminando el proyecto.", {
        extensions: {
          code: "ERROR_DELETING_PROJECT",
        },
      });
    }
  }

}