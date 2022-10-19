import defaultSetting from './config.js';
import { common_extend } from './utils/util';
import Store from './store';
import { locales } from './locale/locale';
import server                        from './controllers/server';
import luckysheetConfigsetting       from './controllers/luckysheetConfigsetting';
import sheetmanage                   from './controllers/sheetmanage';
import luckysheetHandler             from './controllers/handler';
import { initialFilterHandler      } from './controllers/filter';
import { initialMatrixOperation    } from './controllers/matrixOperation';
import { initialSheetBar           } from './controllers/sheetBar';
import { formulaBarInitial         } from './controllers/formulaBar';
import { rowColumnOperationInitial } from './controllers/rowColumnOperation';
import { keyboardInitial           } from './controllers/keyboard';
import { orderByInitial            } from './controllers/orderBy';
import { getluckysheetfile, getluckysheet_select_save, getconfig } from './methods/get';
import { setluckysheet_select_save                               } from './methods/set';
import { luckysheetrefreshgrid, jfrefreshgrid } from './global/refresh';
import functionlist from './function/functionlist';
import { luckysheetlodingHTML } from './controllers/constant';
import { getcellvalue, getdatabyselection } from './global/getdata';
import { setcellvalue                     } from './global/setdata';
import { selectHightlightShow } from './controllers/select';
import { zoomInitial          } from './controllers/zoom';
import { printInitial         } from './controllers/print';
import method from './global/method';

import * as api from './global/api';

import { initListener             } from './controllers/listener';
import { hideloading, showloading } from './global/loading.js';
import { luckysheetextendData     } from './global/extend.js';

const luckysheet = common_extend(api,luckysheet);

// 创建luckysheet表格
luckysheet.create = (setting) => {
  method.destroy();
  
  // Store original parameters for api: toJson
  Store.toJsonOptions = {};
  for(const c in setting) {
    if(c !== 'data') Store.toJsonOptions[c] = setting[c];
  }
  
  const extendsetting = common_extend(defaultSetting, setting);
  const loadurl   = extendsetting.loadUrl;
  const menu      = extendsetting.menu;
  const title     = extendsetting.title;
  const container = extendsetting.container;
  
  Store.container                 = container;
  Store.luckysheetfile            = extendsetting.data;
  Store.defaultcolumnNum          = extendsetting.column;
  Store.defaultrowNum             = extendsetting.row;
  Store.defaultFontSize           = extendsetting.defaultFontSize;
  Store.fullscreenmode            = extendsetting.fullscreenmode;
  Store.lang                      = extendsetting.lang;
  Store.allowEdit                 = extendsetting.allowEdit;
  Store.limitSheetNameLength      = extendsetting.limitSheetNameLength;
  Store.defaultSheetNameMaxLength = extendsetting.defaultSheetNameMaxLength;
  Store.fontList                  = extendsetting.fontList;
  
  server.gridKey        = extendsetting.gridKey;
  server.loadUrl        = extendsetting.loadUrl;
  server.updateUrl      = extendsetting.updateUrl;
  server.updateImageUrl = extendsetting.updateImageUrl;
  server.title          = extendsetting.title;
  server.loadSheetUrl   = extendsetting.loadSheetUrl;
  server.allowUpdate    = extendsetting.allowUpdate;
  
  luckysheetConfigsetting.autoFormatw             = extendsetting.autoFormatw;
  luckysheetConfigsetting.accuracy                = extendsetting.accuracy;
  luckysheetConfigsetting.total                   = extendsetting.data[0].total;
  luckysheetConfigsetting.loading                 = extendsetting.loading;
  luckysheetConfigsetting.allowCopy               = extendsetting.allowCopy;
  luckysheetConfigsetting.showtoolbar             = extendsetting.showtoolbar;
  luckysheetConfigsetting.showtoolbarConfig       = extendsetting.showtoolbarConfig;
  luckysheetConfigsetting.showinfobar             = extendsetting.showinfobar;
  luckysheetConfigsetting.showsheetbar            = extendsetting.showsheetbar;
  luckysheetConfigsetting.showsheetbarConfig      = extendsetting.showsheetbarConfig;
  luckysheetConfigsetting.showstatisticBar        = extendsetting.showstatisticBar;
  luckysheetConfigsetting.showstatisticBarConfig  = extendsetting.showstatisticBarConfig;
  luckysheetConfigsetting.sheetFormulaBar         = extendsetting.sheetFormulaBar;
  luckysheetConfigsetting.cellRightClickConfig    = extendsetting.cellRightClickConfig;
  luckysheetConfigsetting.sheetRightClickConfig   = extendsetting.sheetRightClickConfig;
  luckysheetConfigsetting.pointEdit               = extendsetting.pointEdit;
  luckysheetConfigsetting.pointEditUpdate         = extendsetting.pointEditUpdate;
  luckysheetConfigsetting.pointEditZoom           = extendsetting.pointEditZoom;
  luckysheetConfigsetting.userInfo                = extendsetting.userInfo;
  luckysheetConfigsetting.myFolderUrl             = extendsetting.myFolderUrl;
  luckysheetConfigsetting.functionButton          = extendsetting.functionButton;
  luckysheetConfigsetting.showConfigWindowResize  = extendsetting.showConfigWindowResize;
  luckysheetConfigsetting.enableAddRow            = extendsetting.enableAddRow;
  luckysheetConfigsetting.enableAddBackTop        = extendsetting.enableAddBackTop;
  luckysheetConfigsetting.addRowCount             = extendsetting.addRowCount;
  luckysheetConfigsetting.enablePage              = extendsetting.enablePage;
  luckysheetConfigsetting.pageInfo                = extendsetting.pageInfo;
  luckysheetConfigsetting.editMode                = extendsetting.editMode;
  luckysheetConfigsetting.beforeCreateDom         = extendsetting.beforeCreateDom;
  luckysheetConfigsetting.workbookCreateBefore    = extendsetting.workbookCreateBefore;
  luckysheetConfigsetting.workbookCreateAfter     = extendsetting.workbookCreateAfter;
  luckysheetConfigsetting.remoteFunction          = extendsetting.remoteFunction;
  luckysheetConfigsetting.customFunctions         = extendsetting.customFunctions;
  luckysheetConfigsetting.fireMousedown           = extendsetting.fireMousedown;
  luckysheetConfigsetting.forceCalculation        = extendsetting.forceCalculation;
  luckysheetConfigsetting.plugins                 = extendsetting.plugins;
  luckysheetConfigsetting.rowHeaderWidth          = extendsetting.rowHeaderWidth;
  luckysheetConfigsetting.columnHeaderHeight      = extendsetting.columnHeaderHeight;
  luckysheetConfigsetting.defaultColWidth         = extendsetting.defaultColWidth;
  luckysheetConfigsetting.defaultRowHeight        = extendsetting.defaultRowHeight;
  luckysheetConfigsetting.title                   = extendsetting.title;
  luckysheetConfigsetting.container               = extendsetting.container;
  luckysheetConfigsetting.hook                    = extendsetting.hook;
  luckysheetConfigsetting.pager                   = extendsetting.pager;
  luckysheetConfigsetting.initShowsheetbarConfig  = false;
  luckysheetConfigsetting.imageUpdateMethodConfig = extendsetting.imageUpdateMethodConfig;
  
  // Store the currently used plugins for monitoring asynchronous loading
  Store.asyncLoad.push(...luckysheetConfigsetting.plugins);
  
  // Store formula information, including internationalization
  functionlist(extendsetting.customFunctions);
  
  const devicePixelRatio = extendsetting.devicePixelRatio ?? 1;
  Store.devicePixelRatio = Math.ceil(devicePixelRatio);
  
  // loading
  const loadingObj = luckysheetlodingHTML('#' + container);
  Store.loadingObj = loadingObj;

  if(loadurl == '') {
    sheetmanage.initialjfFile(menu, title);
    initialWorkBook();
  }
  else {
    // eslint-disable-next-line no-undef
    $.post(loadurl, { gridKey: server.gridKey }, (d) => {
      const data = new Function('return ' + d)();
      Store.luckysheetfile = data;
      sheetmanage.initialjfFile(menu, title);
      initialWorkBook();
      if(server.allowUpdate) server.openWebSocket();
    });
  }
};

function initialWorkBook() {
  luckysheetHandler();          // Overall dom initialization
  initialFilterHandler();       // Filter initialization
  initialMatrixOperation();     // Right click matrix initialization
  initialSheetBar();            // bottom sheet bar initialization
  formulaBarInitial();          // top formula bar initialization
  rowColumnOperationInitial();  // row and coloumn operate initialization
  keyboardInitial();            // Keyboard operate initialization
  orderByInitial();             // menu bar orderby function initialization
  zoomInitial();                // zoom method initialization
  printInitial();               // print initialization
  initListener();
}

luckysheet.getluckysheetfile         = getluckysheetfile;          // 获取所有表格数据
luckysheet.getluckysheet_select_save = getluckysheet_select_save;  // 获取当前表格 选区
luckysheet.setluckysheet_select_save = setluckysheet_select_save;  // 设置当前表格 选区
luckysheet.getconfig                 = getconfig;                  // 获取当前表格 config配置
luckysheet.getGridData               = sheetmanage.getGridData;    // 二维数组数据 转化成 {r, c, v} 格式 一维数组 (传入参数为二维数据data)
luckysheet.buildGridData             = sheetmanage.buildGridData;  // 生成表格所需二维数组 (传入参数为表格数据对象file)
luckysheet.luckysheetrefreshgrid     = luckysheetrefreshgrid;      // Refresh the canvas display data according to scrollHeight and scrollWidth
luckysheet.jfrefreshgrid             = jfrefreshgrid;              // Refresh canvas
luckysheet.getcellvalue              = getcellvalue;               // Get the value of the cell
luckysheet.setcellvalue              = setcellvalue;               // Set cell value
luckysheet.getdatabyselection        = getdatabyselection;         // Get selection range value
luckysheet.sheetmanage               = sheetmanage;
luckysheet.flowdata                  = () => Store.flowdata;       // Data of the current table
luckysheet.selectHightlightShow      = selectHightlightShow;       // Set selection highlight
luckysheet.destroy                   = method.destroy;             // Reset parameters after destroying the table
luckysheet.showLoadingProgress       = showloading;
luckysheet.hideLoadingProgress       = hideloading;
luckysheet.luckysheetextendData      = luckysheetextendData;
luckysheet.locales                   = locales;

export { luckysheet };
