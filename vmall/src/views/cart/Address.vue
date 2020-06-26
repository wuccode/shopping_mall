<template>
    <div class="submit">
        <van-cell @click="isShow">
            <div class="address">
                <div>
                    <span>{{ select.name }}</span> <span>{{ select.tel || '' | tel }}</span>
                    <span v-show="select.isDefault" class="default">默认</span>
                </div>
                <p>{{ select.address }}</p>
                <i></i>
                <span class="more"></span>
            </div>
        </van-cell>
        <vanPopup v-model="show" closeable position="bottom" class="popup" :lock-scroll="true" :lazy-render="true" :style="{ height: '60%' }">
            <h3>选择收货地址</h3>
            <van-address-list class="popupList" v-show="show" v-model="chosenAddressId" :list="list" default-tag-text="默认" @add="addressAdd = !addressAdd" @edit="onEdit" @select="selectAdd" />
        </vanPopup>
        <vanPopup v-model="isList" closeable position="bottom" class="popup" :lock-scroll="true" :lazy-render="true" :style="{ height: '60%' }">
            <h3>编辑收货地址</h3>
            <van-address-edit
                v-show="isList"
                :area-list="areaList"
                show-set-default
                show-delete
                :search-result="searchResult"
                :area-columns-placeholder="['请选择', '请选择', '请选择']"
                @save="onSave"
                @delete="onDelete"
                :address-info="AddressInfo"
                class="edit"
            />
        </vanPopup>
        <vanPopup v-model="addressAdd" closeable position="bottom" class="popup" :lock-scroll="true" :lazy-render="true" :style="{ height: '60%' }">
            <h3>添加收货地址</h3>
            <van-address-edit
                v-show="addressAdd"
                :area-list="areaList"
                show-set-default
                :search-result="searchResult"
                :area-columns-placeholder="['请选择', '请选择', '请选择']"
                @save="onSave"
                @delete="onDelete"
                class="edit"
            />
        </vanPopup>
    </div>
</template>
<script>
import area from './../../config/area'
import {getAddress, addAddress, updataAddress, delAddress} from './../../server/index'
export default {
    name: 'Address',
    data() {
        return {
            show: false,
            select: {},
            isList: false,
            isfocus: true,
            addressAdd: false,
            chosenAddressId:'',
            areaList: area,
            AddressInfo: {},
            searchResult: [],
            list: [],
        }
    },
    created() {
        this.init()
    },
    filters: {
        tel(tel) {
            return tel ? tel.slice(0, 3) + '****' + tel.slice(-4) : '你还没有收货地址'
        },
    },
    methods: {
        isShow(){
            if(!this.list.length){
                this.addressAdd = !this.addressAdd;
            }else{
                this.show = !this.show;
            }     
        },
        async init() {
            let result = await getAddress();            
            if(![...result.data.data].length) {
                this.list = [];
                this.select = {};
                this.show = false
                return;
            }   
            this.list = [...result.data.data];
            this.select = this.list.filter((arr) => arr.isDefault)[0] || this.list[0]
            let index = this.list.findIndex(arr=>arr.isDefault);
            if(index !== -1){
                this.chosenAddressId = this.list[index].id || this.list[0].id
                let addDefault = this.list.splice(index,1)[0];
                this.list.unshift(addDefault)
            } 
        },
        onEdit(item) {
            this.isList = true
            this.AddressInfo = item
            
        },
        selectAdd(item) {
            this.select = item
            this.show = false
        },
        async onSave(val) {            
            let add = {
                id: val.id || '',
                name: val.name,
                tel: val.tel,
                address:val.province !== val.city ? val.province + val.city + val.county + val.addressDetail : val.city + val.county + val.addressDetail,
                addressDetail: val.addressDetail,
                isDefault: val.isDefault,
                province:val.province,
                city: val.city,
                county: val.county,
                areaCode: val.areaCode,
            }
            if(!val.id){
                await addAddress(add);
                this.init()
                this.addressAdd = false
                
            }else{
                await updataAddress(add)
                this.init()
                this.isList = false;
            }
        },
        async onDelete(val) {
            await delAddress(val.id)
            this.init()
            this.isList = false;
        },
    },
    watch:{
        select(){
            this.$emit('setSelect',this.select)
        }
    },
}
</script>
<style scoped>
.address {
    position: relative;
    padding: 0.8rem 0rem 0.8rem 0rem;
    font-size: 1rem;
    font-weight: bold;
    margin-top:3rem ;
}
.address div {
    padding: 0rem 1.2rem;
}
.address p {
    padding: 0.4rem 1.2rem;
    font-weight: 400;
    font-size: 0.7rem;
    width: 86%;
    overflow: hidden;
    max-height: 1.6rem;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.address i {
    position: absolute;
    width: 100%;
    height: 0.16rem;
    background: url('./../../images/add-border.png') no-repeat;
    background-size: cover;
    bottom: 0;
}
.more {
    position: absolute;
    width: 1.5rem;
    height: 1.5rem;
    top: 0.3rem;
    right: 1rem;
    background: url('./../../images/icon_header_nav.png') no-repeat;
    background-size: cover;
    opacity: 0.5;
}
.van-cell >>> {
    line-height: 1rem;
    padding: 0 0;
}
.van-radio-group >>> {
    overflow-y: scroll;
    height: 16rem;
}
.van-address-list {
    padding: 0 0.5rem;
    height: 80%;
}

.van-address-list__bottom >>> {
    bottom: 1rem;
}

.popup {
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
}
.popup h3 {
    padding: 0.6rem 1rem;
}
.submit >>> .van-overlay {
    background-color: rgba(0, 0, 0, 0.3) !important;
}
.edit {
    overflow: hidden;
    padding: 0;
}
.edit >>> .van-address-edit__fields {
    height: 11.5rem;
    overflow-y: scroll;
}
.edit >>> .van-address-edit__buttons {
    width: 100%;
    margin: 1rem auto 0 auto;
    padding: 0;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
}
.edit >>> button{
    width: 40% !important;
    display: inline-block;
    margin: 0 0.6rem;
}
.default{
    display: inline-block;
    font-size: 0.45rem;
    padding: 0 0.4rem;
    font-weight: 300;
    color: #fff;
    vertical-align: top;
    border-radius:0.5rem ;
    margin-left: 0.5rem;
    background: #ee0a24;
}
</style>
