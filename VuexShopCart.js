var shopLists = {
	template: `<div>
				<div v-if="goods.length==0">购物车没有商品，<a href="https://wx.gmzx.com/">去购物车吧</a></div>
				<div v-if="goods.length>0">
				<h2 class="title">购物车列表</h2>
				<div class="goods" v-for="(item,index) in goods" :key="item.id">
					<span :style=[styleNumber]>{{item.id}}</span>
					<img :src="item.imgs" alt="" />
					<div class="detail-list">
							<h2>{{item.name}}</h2>
							<p>选择规格</p>
							<div class="flex">
								<span style="color: red;">{{item.price}}</span>
								
								<div>
									<input type="text" v-model="item.count" v-bind:style="[styleBorder]"/>
								</div>
								<button class="del" @click="del">移除</button>
							</div>
						</div>
					</div>
					<div class="total">总价：<span style="color: red;">￥ {{totalPrice}}</span></div>
				</div>
		</div>
	`,
	data(){
		return{
			styleNumber:{
				paddingRight:'0.1rem',
				fontSize:"0.28rem"
			},
			styleBorder: {
				width:"1.45rem",
		    	border: "0.01rem solid #eee",
		    	paddingLeft:'0.1rem'
		   },
		}
	},
	//计算总价格
	computed: {
		goods(){
			return this.$store.state.goods
		},
		totalPrice(){
			return this.$store.getters.totalPrice
		}
	},
	
	methods: {
		del(id){
			this.$store.commit('del',id)
		}

	},

}


const store = new Vuex.Store({
		state:{
			goods: []
		},
		getters:{
			totalPrice(state){
//				let total = state.goods.reduce((v,m) =>v + m.price * m.count,0);
				let total = state.goods.reduce(function(v,m){
					console.log(v,m)
					return v + m.price * m.count;
				},0)
				
				return total.toString().replace(/\B(?=(\d{3})+$)/g, ',');
			}
		},
		mutations:{
			//删除的方法
			del(state,param){
				let k;
				state.goods.forEach((item) =>{
					if(item.id == param.id){
						return k = item.id;
					}
				})
				state.goods.splice(k,1)
			},
			
			setGoods(state,param){
				state.goods = param.goods;
			}
		},
		
		actions:{ 
			loadGoods(context){
				axios.get('goodsText.json').then(function (response) {
				  	context.commit('setGoods',{goods:response.data.goods})
				    console.log(response.data.goods);
				  }).catch((error)=>{
				  	 console.log(error);
				  })
			}
		}
		
})