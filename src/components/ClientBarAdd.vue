<template>

  <div class="row input-row">
    <div class="input-field col s12">
      <p>Оплата</p>
      <select v-model="form.cash" class="browser-default">
        <option value="Выберите кассу" disabled selected>Выберите кассу</option>
        <option v-for="cash in cashArray" :key="cash._id" :value="cash.name">{{ cash.name }}</option>
      </select>
      <select v-model="form.method" class="browser-default">
        <option value="Способ оплаты" disabled selected>Способ оплаты</option>
        <option v-for="method in methodArray" :key="method._id" :value="method.name">{{ method.name }}</option>
      </select>
      <select v-if="form.method===cardTrigger" v-model="form.card" class="browser-default">
        <option value="Карта" disabled selected>Карта</option>
        <option v-for="card in cardArray" :key="card._id" :value="card.name">{{ card.name }}</option>
      </select>

    </div>
  </div>

  <div class="row input-row">
    <div class="input-field col s12">
      <p>Напиток</p>
      <select v-model="form.bar" class="browser-default">
        <option value="Выбор напитка" disabled selected>Выбор напитка</option>
        <option v-for="bar in barArray" :key="bar._id" :value="bar._id">{{ bar.name }} за {{ bar.cost }}</option>
      </select>
    </div>
    <div v-if="form.bar!==form_start.bar" class="cost">
      <p>
        <span>
          Стоимость: {{ barItemDiscountedCost }}
        </span>
        <span v-if="parseInt(form.discount)">
          (с учётом скидки {{ form.discount }}% )
        </span>
      </p>
      <form>
        <p class="range-field">
          <label for="discount">Скидка: {{ form.discount }}%</label>
          <input v-model="form.discount" type="range" id="discount" min="0" max="50"/>
        </p>
      </form>

      <div v-if="isDiscounted" class="discount_reason">
        <form action="#">
          <p>
            <label v-for="(discount_reason, idx) in discount_reason_array" :key="idx">
              <input :value="discount_reason" v-model="form.discount_reason" type="radio"/>
              <span>{{ discount_reason }}</span>
            </label>
          </p>
        </form>
      </div>
      <div v-if="needTextReason" class="discount_reason__text">
        <input placeholder="Обоснование" v-model="form.discount_reason_text" type="text"/>
      </div>

    </div>
  </div>
  <button @click.stop="saveBarPurchase" :disabled="!isFormValid" class="btn btn-small">Сохранить</button>


</template>

<script>
import { computed, reactive, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

export default {
  emits: ['close-add-bar-form'],
  setup(_, { emit }) {
    const store = useStore()
    const route = useRoute()
    const form_start = {
      cash: 'Выберите кассу',
      method: 'Способ оплаты',
      card: 'Карта',
      bar: 'Выбор напитка',
      discount: '0',
      discount_reason: '',
      discount_reason_text: '',
    }

    const form = reactive({
      cash: form_start.cash,
      method: form_start.method,
      card: form_start.card,
      bar: form_start.bar,
      discount: form_start.discount,
      discount_reason: form_start.discount_reason,
      discount_reason_text: form_start.discount_reason_text
    })

    const cardTrigger = 'Перевод на карту'
    const discount_reason_array = [
      'Первый визит',
      'Купон',
      'Флайер',
      'VIP карта',
      'Другое'
    ]

    const discountReasonTrigger = 'Другое'

    const isDiscounted = computed(() => parseInt(form.discount) > 0)
    const barArray = computed(() => store.getters.barList)
    const cashArray = computed(() => store.getters.CASH_itemList)
    const cardArray = computed(() => store.getters.CARD_itemList)
    const methodArray = computed(() => store.getters.METHOD_itemList)


    watch(isDiscounted, newValue => {
      if (!newValue) {
        form.discount_reason = form_start.discount_reason
        form.discount_reason_text = form_start.discount_reason_text
      }
    })

    watch(() => form.method, (newValue) => {
      if (newValue !== cardTrigger) {
        form.card = form_start.card
      }
    })

    const clearForm = () => {
      form.cash = form_start.cash
      form.method = form_start.method
      form.card = form_start.card
      form.bar = form_start.bar
      form.discount = form_start.discount
      form.discount_reason = form_start.discount_reason
      form.discount_reason_text = form_start.discount_reason_text
    }

    const barItemCost = computed(() => {
      if (form.bar === form_start.bar) {
        return 0
      }
      return barArray.value.filter(item => item._id === form.bar)[0].cost
    })

    const barItemDiscountedCost = computed(() => Math.round(barItemCost.value * (1 - parseInt(form.discount) / 100)))
    const barItemName = computed(() => {
      if (form.bar === form_start.bar) {
        return ''
      }
      return barArray.value.filter(item => item._id === form.bar)[0].name
    })

    const cash_box_item = computed(() => {
      if (form.cash === form_start.cash) {
        return {}
      } else {
        return cashArray.value.filter(item => item.name === form.cash)[0]
      }
    })

    const payment_method = computed(() => {
      if (form.method === form_start.method) {
        return {}
      } else {
        return methodArray.value.filter(item => item.name === form.method)[0]
      }
    })

    const card_item = computed(() => {
      if (form.card === form_start.card) {
        return {}
      } else {
        return cardArray.value.filter(item => item.name === form.card)[0]
      }
    })

    const bar_item = computed(() => {
      if (form.bar === form_start.bar) {
        return {}
      } else {
        return barArray.value.filter(item => item._id === form.bar)[0]
      }
    })

    const ref_client = computed(() => route.params.id)
    const ref_day = computed(() => {
      if (store.getters.dayList) {
        return store.getters.dayList[0]._id
      } else {
        return null
      }
    })

    const data2send = computed(() => {
      const data = {
        payment_category: 'bar',
        payment_method_name: payment_method.value ? payment_method.value.name : '',
        payment_method_id: payment_method.value ? payment_method.value._id : '',
        cash_box_name: cash_box_item.value ? cash_box_item.value.name : '',
        cash_box_id: cash_box_item.value ? cash_box_item.value._id : '',
        item_id: bar_item.value._id,
        item_name: bar_item.value.name,
        item_cost: barItemCost.value,
        item_cost_discounted: barItemDiscountedCost.value,
        client_id: ref_client.value,
        day_id: ref_day.value
      }

      if (form.method === cardTrigger) {
        data.card_name = card_item.value.name
        data.card_id = card_item.value._id
      }

      if (form.discount !== form_start.discount) {
        data.payment_discount_value = parseInt(form.discount) / 100
        data.payment_discount_reason = form.discount_reason
      }

      if (form.discount_reason === discountReasonTrigger) {
        data.payment_discount_reason_text = form.discount_reason_text
      }

      return data
    })

    const saveBarPurchase = async () => {
      await store.dispatch('PURCHASE_CREATE', data2send.value)
      clearForm()
      emit('close-add-bar-form')
    }

    return {
      emit,
      form,
      form_start,
      cardTrigger,
      isDiscounted,
      discount_reason_array,
      barArray,
      barItemCost,
      barItemDiscountedCost,
      data2send,
      barItemName,
      cashArray,
      cardArray,
      cash_box_item,
      payment_method,
      card_item,
      ref_day,
      ref_client,
      bar_item,

      methodArray,
      needTextReason: computed(() => form.discount_reason === 'Другое'),

      isFormValid: computed(() => {
        return !((form.cash === form_start.cash) ||
            (form.method === form_start.method) ||
            ((form.method === cardTrigger) && (form.card === form_start.card)) ||
            ((form.discount_reason === form_start.discount_reason) && (isDiscounted.value)) ||
            ((form.discount_reason === 'Другое') && (!form.discount_reason_text)) ||
            (form.bar === form_start.bar))
      }),

      clearForm,
      saveBarPurchase,
    }
  }
}
</script>

<style lang="scss" scoped>
.input-row {
  margin-bottom: 0;
}

.browser-default {
  margin-top: 10px;
}

select option:disabled {
  color: #b4b4b4;
}

.discount_reason {
  display: flex;
  justify-items: flex-start;
}

[type="radio"]:not(:checked) + span, [type="radio"]:checked + span {
  padding-left: 27px;
  padding-right: 5px;
}

button.btn.btn-small {
  margin-top: 15px;
}

</style>