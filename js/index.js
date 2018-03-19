export const isEmpty=(val)=>{  
    switch (val) {
      case "":
      case 0:
      case "0":
      case null:
      case false:
      case undefined:
      case typeof this == "undefined":
      return true;
      break;      
      default:      
        return false;
        break;      
    }  
}