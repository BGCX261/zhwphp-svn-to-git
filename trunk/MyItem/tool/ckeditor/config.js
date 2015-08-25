CKEDITOR.editorConfig = function( config )
{
	//界面语言
	config.language = 'zh-cn';
	
	//预置字体样式
	config.font_names = '宋体;楷体_GB2312;新宋体;黑体;隶书;幼圆;微软雅黑;Arial;Comic Sans MS;Courier New;Tahoma;Times New Roman;Verdana;';

	//预置字体大小
	config.fontSize_sizes ='8/8px;9/9px;10/10px;11/11px;12/12px;14/14px;16/16px;18/18px;20/20px;22/22px;24/24px;26/26px;28/28px;36/36px;48/48px;72/72px;';
	
	//界面皮肤
	config.skin = 'office2003';
	
	//config.baseHref = '';
	
	//config.editingBlock = true;
	
	//打开时获得焦点
	config.startupFocus = true;
	
	//config.startupOutlineBlocks = false;
	
	//界面高度
	config.height = 300;
	
	//界面宽度
	config.width = 700;
	
	//工具栏工具
	config.toolbar=

[

['Source','Preview','Maximize'],

['Undo','Redo'],

['NumberedList','BulletedList'],

['JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock'],

['Link','Unlink','Image','Table'],

['Format','Font','FontSize'],

['Bold','Italic','Underline','Strike'],['TextColor','BGColor'],

];

};
