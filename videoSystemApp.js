import VideoSystem, {
  Person,
  Category,
  Resource,
  Production,
  Movie,
  Serie,
  User,
  Coordinate,
} from "./videoSystemModel.js";
import VideoSystemController from "./videoSystemController.js";
import VideoSystemView from "./videoSystemView.js";

//Instancia de controlador pasandole como argumentos la vista y el modelo
const VideoSystemApp = new VideoSystemController(
  VideoSystem.getInstance(),
  new VideoSystemView());

//VideoSystemApp.onLoad();




export default VideoSystemApp;