import jQuery from "jquery";
import _ from "lodash";
import { a } from "@/script/app";
import "@/style/index.less";
import "@/index.css";
console.log(a);

jQuery(function () {
  console.log(123);
});

jQuery.ajax({
  url: "http://127.0.0.1:3005/api/hh",
});

jQuery.ajax({
  url: "http://127.0.0.1:3005/api1/hh1",
});