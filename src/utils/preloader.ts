import pubsub from "sweet-pubsub";

const openPreloader = (duration:number | null =null) => pubsub.emit('preloader', {isOpen:true,duration:duration });
const closePreloader = () => pubsub.emit('preloader', { isOpen:false,duration:null });
export {openPreloader,closePreloader};
