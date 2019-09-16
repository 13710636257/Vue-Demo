var shopcart = {
	template: `<div>
				<div v-if="goods.length==0">购物车没有商品，<a href="https://wx.gmzx.com/">去购物车吧</a></div>
				<div v-if="goods.length>0">
				<h2 class="title">购物车列表</h2>
				<div style="padding:0.2rem;">
					<input type="checkbox" v-model="checked" class="all" @change="checkAll" />全选
				</div>

				<div class="goods" v-for="(item,index) in goods" :key="item.id">
					<input type="checkbox" v-bind:name="item.name" v-model="checkModel" :value="item.id" />
					<img :src="item.imgs" alt="" />
					<div class="detail-list">
							<h2>{{item.name}}</h2>
							<p>选择规格</p>
							<div class="flex">
								<span style="color: red;">{{item.price}}</span>
								
								<div>
									<button @click="handleReduce(index)">-</button>
										<span>{{item.count}}</span>
									<button @click="handleAdd(index)">+</button>
								</div>
								<button class="del" @click="handleRemove(index)">移除</button>
							</div>
						</div>
					</div>
				<div class="total">总价：<span style="color: red;">￥ {{totalPrice}}</span></div>
				</div>
		</div>
	`,
	data() {
		return {
			goods: [{
					id: 1,
					name: "冰点四肢脱毛",
					price: "2666",
					count: 1,
					checked: false,
					imgs: "https://cdn.gmzx.com/images/wxapp/products/banner/tuoMao.jpg"
				},
				{
					id: 2,
					name: "无针水光",
					price: "680",
					count: 1,
					checked: false,
					imgs: "https://cdn.gmzx.com/images/wxapp/products/banner/wuZhengShuiGuang.jpg"
				},
				{
					id: 3,
					name: "BOTOX除皱针单部位",
					price: "980",
					count: 1,
					checked: false,
					imgs: "https://cdn.gmzx.com/images/wxapp/products/banner/zhuShe/BOTOXChuZhou.jpg"
				},
				{
					id: 4,
					name: "伊婉玻尿酸 5000元美丽基金",
					price: "1335.8",
					count: 1,
					checked: false,
					imgs: "https://cdn.gmzx.com/images/wxapp/pintuan/head.jpg"
				}
			],
			checked: false,
			checkModel: [] //双向数据绑定的数组，获取id的方式
		}
	},

	//计算总价格
	computed: {
		totalPrice(){
			var i, total = 0;
			for(i = 0;i<this.goods.length;i+=1){
				var item = this.goods[i];
				console.log(item.id);
				if(this.checkModel.indexOf(item.id)>-1){
					total += item.price * item.count;
				}
			}
			return total.toString().replace(/\B(?=(\d{3})+$)/g, ',');
		}

	},
	
	watch: { //使用watch来响应数据的变化
		checkModel(val) { //监听checkModel属性，当其长度 ===input元素时 全选按钮选中，否则取消
			if(val.length === this.goods.length) {
				this.checked = true;
			} else {
				this.checked = false;
			}
		}
	},

	methods: {
		//数量增	加
		handleAdd(index){
			this.goods[index].count++;
		},
		//数量减
		handleReduce(index) {
			if(this.goods[index].count > 1) {
				this.goods[index].count--;
			}
			
		},
		//删除
		handleRemove(index) {
			this.goods.splice(index, 1)
		},
		//		全选
//		checkAll() {
//			if(this.goods.checked) {
//				this.checkModel = [];
//			} else {
//				this.goods.forEach((item)=>{
//					console.log(item.id)
//		　　　　　　if(this.checkModel.indexOf(item.id)===-1){
//		　　　　　　　　this.checkModel.push(item.id)
//		　　　　　　}
//		　　　　　})
//			}
//		}

		// map()会分配内存空间存储新数组并返回，forEach()不会返回数据
		checkAll(e){
			this.checkModel = e.target.checked?this.goods.map(item => item.id):[];
		}

	},

}