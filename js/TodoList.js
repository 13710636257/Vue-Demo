var todolist = {
	template:`<div class="people-list">
			<h2 class="title">人员管理列表</h2>
			<div class="inp-text">
				<input type="text" v-model.trim="nameValue">
				<button @click="handelAddName">提交</button>
			</div>
			<ul>
				<li v-for="(item,index) in peoplesList" :key="item.id">
					<div class="name" >
						<input type="checkbox" placeholder="添加姓名" v-model="item.checked">
						<span>{{item.name}}</span>
					</div>
					<div :id="index">
						<button @click="EditName(index)">编辑</button>
						<button @click="del(item,index)">删除</button>
					</div>
				</li>
			</ul>
			
			 <div class="wrap" v-show="showEditPage">
		            <div class="content">
		                <input type="text" placeholder="请输入新姓名" v-model="newValue"/>
		                <button @click="cancelBtn">取消</button>
		                <button @click="EditContent">确定</button>
		            </div>
        	</div>
	</div>`,
	
	data(){
		return{
			peoplesList:[
				{id:1,name:"张松连",checked:false},
				{id:2,name:"前端开发",checked:false},
			],
			nameValue:'',
			newValue:'',
			showEditPage:false,
		}
	},
	
	methods:{
		//添加功能
		handelAddName(){		
			if(this.nameValue===""){
				alert('请输入新增人员名')
			}else {
				var data = {};
				data.name = this.nameValue;
				this.peoplesList.push(data);
				this.nameValue=""
			}
		},
		//删除
		del(item,index){
			if(!!item.checked){
//				checked为true才执行此代码
			    alert('删除成功！')
				this.peoplesList.splice(index,1);
			}else{
				alert('请选中删除')
			}
			
		
		},
//		编辑
		EditName(index){
			this.showEditPage = true;
			this.newValue = this.peoplesList[index].name
		},
//		取消
		cancelBtn(){
			this.showEditPage = false;
		},
////	确定
		EditContent(e){
			let v = this.newValue;
			if(v.trim() ==""){
				 alert('请输入新增人员名')
			}else{
				this.peoplesList[0].name = this.newValue
				this.showEditPage = false;
			}
			
		}
	}
}
