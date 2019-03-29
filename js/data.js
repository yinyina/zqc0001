// JavaScript Document
//课程代码：
var CourseCode="zqc0001"

//课程名称
var sCourseTitle = "小学校园足球教学游戏的创编与拓展";
//导航标题
var sMenuTitle = "学习导航";

//课程相关信息
var arrkcjs = ["课程简介-kc","专家简介-zj","授课PPT-ppt","思考问题-sk"]
var arrkcjscnt

var arrkcjsli1=[];
var arrkcjsli2=[];
var arrkcjsli3=[];
var arrkcjsli4=[];
var arrkcjsli5=[];
var arrkcjsli6=[];

//各级栏目信息（层级，课程名称，栏目文档类型，所连接文件的文件名（视频填CC的vid），没有就留空。不管有没有2级，最底层栏目的层级统一填3级）
var arrList = [
{
	"level":"1",
	"coursename":"视频学习"
},{
	"level":"3",
	"coursename":"球性练习",
	"filetype":"v",
	"filename":"523907DEB88CD7FE9C33DC5901307461",
	"localpath":"sp1",
},{
	"level":"3",
	"coursename":"准备姿势",
	"filetype":"v",
	"filename":"0837966EBF8766EC9C33DC5901307461",
	"localpath":"sp2",
},{
	"level":"3",
	"coursename":"移动技术",
	"filetype":"v",
	"filename":"D0A4FEF04999D7399C33DC5901307461",
	"localpath":"sp3",
},{
	"level":"3",
	"coursename":"上手接球技术",
	"filetype":"v",
	"filename":"5D98C1215473E13F9C33DC5901307461",
	"localpath":"sp4",
},{
	"level":"3",
	"coursename":"接地滚球技术",
	"filetype":"v",
	"filename":"313B6209F5097FA79C33DC5901307461",
	"localpath":"sp5",
}]



var arrNum = ["第一部分","第二部分","第三部分","第四部分","第五部分","第六部分","第七部分","第八部分","第九部分","第十部分"]