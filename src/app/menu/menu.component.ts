import { Component, OnInit } from "@angular/core";

import { MENUS } from "../../shared/mock-menus";
import { MATERIAL } from "../../shared/mock-material";

import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  ValidatorFn
} from "@angular/forms";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.css"]
})
export class MenuComponent implements OnInit {
  ngOnInit() {}

  menu_select = "请选择一道菜";
  
  isLogin = false;
  userName = "zhouzhengyu";

  menus = MENUS;
  materials = MATERIAL;

  selected_material = [];

  selected_value = ""

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    const controls = this.materials.map(c => new FormControl(false));
    controls[0].setValue(true);
    this.form = this.formBuilder.group({
      materials: new FormArray(controls, minSelectedCheckboxes(1))
    });
  }

  menuControl(value) {
    this.selected_value = value
    if (value === "") {
      this.menu_select = "请选择一道菜";
    } else {
      this.menu_select = "Okay！您选择了" + value + "  猜猜看什么材料制作的";
    }
  }

  materialCheck(data, dataBool) {
    console.log(data, dataBool);
  }



  submit() {
    const selectedOrderIds = this.form.value.materials
      .map((v, i) => (v ? this.materials[i].id : null))
      .filter(v => v !== null);


    if(checkGame(this.selected_value, selectedOrderIds)){
      this.isLogin = true;
    }else{
      this.isLogin = true;
    }
  }
}

function checkGame(menu_select, selectedOrderIds) {
 console.log(typeof(selectedOrderIds)+"----")
 console.log(menu_select)
 
  if (selectedOrderIds.length != 2) {
    return false;
  } else {
    if (menu_select === "麻婆豆腐") {
        if (selectedOrderIds[0]==1 &&selectedOrderIds[1]==2){
          return true;
        }else{return false}
    }else if(menu_select === "水煮牛肉"){
      if (selectedOrderIds[0]==2 &&selectedOrderIds[1]==5){
        return true;
      }else{return false}
    }else if(menu_select === "韭菜炒蛋"){
      if (selectedOrderIds[0]==3 &&selectedOrderIds[1]==4){
        return true;
      }else{return false}
    }else if(menu_select === "猪肉水饺"){
      if (selectedOrderIds[0]==6 &&selectedOrderIds[1]==7){
        return true;
      }else{return false}
    }else{
      return false
    }
  }
}

function minSelectedCheckboxes(min = 1) {
  const validator: ValidatorFn = (formArray: FormArray) => {
    const totalSelected = formArray.controls
      .map(control => control.value)
      .reduce((prev, next) => (next ? prev + next : prev), 0);

    return totalSelected >= min ? null : { required: true };
  };

  return validator;
}
