/**
*    李世奇  2018.7.12
**/
(function (global, undefined) {

    function MyTodolist(opt) {
        this.def = opt;
        //保证组件id唯一
        this.def.mytodolistUl = 'mytodolistUl' + new Date().getTime();
        this.def.mytodolistForm = 'mytodolistForm' + new Date().getTime();
        this.def.mytodolistInput = 'mytodolistInput' + new Date().getTime();
        this.def.mytodolistFooter = 'mytodolistFooter' + new Date().getTime();
        this._initHtml();
        this.referfh();
    }

    MyTodolist.prototype = {
        constructor: this,
        _initHtml: function () {
            //初始化html结构
            var html = `
        <div class="inner">
            <form id="${this.def.mytodolistForm}">
                <input id="${this.def.mytodolistInput}" type="text" placeholder="写点什么吧">
                <button type="submit">添加</button>
            </form>
        </div>
        <ul class="dodo-list" id='${this.def.mytodolistUl}'></ul>
        <p class="footer" id="${this.def.mytodolistFooter}">
            Show:
            <a class="span" href="javascript:;">全部</a>
            <a href="javascript:;">未完成</a>
            <a href="javascript:;">已完成</a>
        </p>
            `
            document.getElementById(this.def.container).innerHTML = html;
            document.getElementById(this.def.mytodolistForm).addEventListener('submit', (e) => {
                e.preventDefault();
                var val = document.getElementById(this.def.mytodolistInput).value;
                document.getElementById(this.def.mytodolistInput).value = '';
                this._add(val);
                this.referfh();
            })
            document.getElementById(this.def.mytodolistFooter).addEventListener('click', (e) => {
                this._filter(e);
                this.referfh();
            })
        },
        _add: function (val) {
            //添加条目
            if (val) {
                this.def.data.unshift({ code: 'code' + new Date().getTime(), value: val });
            }
        },
        _filter: function (e) {
            //条件过滤
            var text = e.target.text;
            e.target.parentNode.childNodes.forEach(element => {
                if(element.nodeName == 'A'){
                    element.classList.remove('span');
                }
            });
            e.target.classList.add('span');
            if (text == '全部') {
                this.def.showType = 'all';
            } else if (text == '未完成') {
                this.def.showType = 'active';
            } else if (text == '已完成') {
                this.def.showType = 'completed';
            }
        },
        _deleteItem:function(code){
            //删除条目
            var index = this._getCodeIndex(this.def.data,code);
            this.def.data.splice(index,1);
            this.referfh();
        },
        _getCodeIndex: function (array, code) {
            //获取数组中code的下标
            var i = 0;
            array.forEach((element, index) => {
                if (element.code.toString() == code.toString()) {
                    i = index;
                }
            });
            return i;
        },
        referfh: function () {
            //组件刷新
            var arr = this.def.data;
            if (this.def.showType == 'completed') {
                arr = this.def.data.filter(t => t.completed);
            } else if (this.def.showType == 'active') {
                arr = this.def.data.filter(t => !t.completed);
            }
            var ul = document.getElementById(this.def.mytodolistUl);
            ul.innerHTML = '';
            var flag = document.createDocumentFragment();
            arr.forEach(element => {
                var li = document.createElement('li');
                if (element.completed) {
                    li.innerHTML = `<em class="selected"></em><p name="${element.code}" class="completed">${element.value}</p><i class="fa fa-pencil" aria-hidden="true"></i> <span>×</span>`
                } else {
                    li.innerHTML = `<em></em><p name="${element.code}"  >${element.value}</p><i class="fa fa-pencil" aria-hidden="true"></i> <span>×</span>`
                }
                li.addEventListener('click', (e) => {
                    var name = e.target.nodeName;
                    if (name == 'SPAN') {
                        //移除
                       this._deleteItem(e.target.parentNode.childNodes[1].getAttribute('name'));
                    }
                    else if(name == 'I'){
                        var text = e.target.parentNode.childNodes[1].innerText;
                        var code = e.target.parentNode.childNodes[1].getAttribute('name');
                        var val = prompt('请修改',text);
                        this.def.data.forEach(element => {
                            if(element.code == code){
                                element.value = val;
                            }
                        });
                        this.referfh();
                    }
                    else if (element.completed) {
                        element.completed = false;
                        if (name == 'P') {
                            e.target.classList.add('completed');
                            e.target.parentNode.childNodes[0].classList.add('selected');
                        } else if (name == 'EM') {
                            e.target.classList.add('selected');
                            e.target.parentNode.childNodes[1].classList.add('completed');
                        }
                    } else {
                        element.completed = true;
                        if (name == 'P') {
                            e.target.classList.remove('completed');
                            e.target.parentNode.childNodes[0].classList.remove('selected');
                        } else if (name == 'EM') {
                            e.target.classList.remove('selected');
                            e.target.parentNode.childNodes[1].classList.remove('completed');
                        }
                    }
                    this.referfh();
                });
                flag.appendChild(li);
            });
            ul.appendChild(flag);

            this.def.getData(this.def.data.filter(t => t.completed),this.def.data.filter(t => !t.completed));
        },
        getCompleted:function(){
            //获取已完成数据
           return this.def.data.filter(t => t.completed); 
        },
        getActive:function(){
            //获取未完成数据
            this.def.data.filter(t => !t.completed);
        }
    }

    global.MyTodolist = MyTodolist;

})(window);