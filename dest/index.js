
const os = require('os')

const platform = os.platform();

const MAC = platform === 'darwin';

// const LINUX = platform === 'linux'

const keyPathVisitor = (obj,path,setValue) =>{
    const pathLength = path.length;
    return path.reduce((pre,next)=>{
        if(pre !== setValue ){
            const preValue = pre;
            const nextvalue =  preValue[next]
            return !nextvalue?
                setValue || undefined
                :
                nextvalue;
        }else{
            return setValue || undefined
        }
    },obj)
}


module.exports = function(babel){

    const {types:t, template} = babel;

    const visitor = MAC ? { 
        CallExpression(path,state){
            const node = path.node;
            const objectName = keyPathVisitor(node,['callee','object','name'])
            const prototypeName = keyPathVisitor(node,['callee','property','name'])
            if(objectName === 'console' && prototypeName === 'log'){
                path.remove()
            }
        }
    } : {}
    
    return {
        visitor
    }
} 