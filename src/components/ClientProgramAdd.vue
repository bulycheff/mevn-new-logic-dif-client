<template>
  <div class="row input-row">
    <div class="input-field col s12">
      <p>Оплата</p>
      <select v-model="form.cash" class="browser-default">
        <option value="Выберите кассу" disabled selected>Выберите кассу</option>
        <option v-for="cash in cashArray" :key="cash._id" :value="cash._id">{{ cash.name }}</option>
      </select>
      <select v-model="form.method" class="browser-default">
        <option value="Способ оплаты" disabled selected>Способ оплаты</option>
        <option v-for="method in methodArray" :key="method._id" :value="method._id">{{ method.name }}</option>
      </select>
      <select v-if="isCardMethod" v-model="form.card" class="browser-default">
        <option value="Карта" disabled selected>Карта</option>
        <option v-for="card in cardArray" :key="card._id" :value="card._id">{{ card.name }}</option>
      </select>

      <br>
      <p>Программа</p>
      <select v-model="form.room" class="browser-default">
        <option value="Выбор комнаты" disabled selected>Выбор комнаты</option>
        <option v-for="room in roomArray" :key="room._id" :value="room._id">{{ room.name }}</option>
        <option></option>
      </select>
      <select v-model="form.service" class="browser-default">
        <option value="Услуга" disabled selected>Услуга</option>
        <option v-for="service in serviceArray" :key="service._id" :value="service._id">{{ service.name }}</option>
      </select>
      <select v-model="form.master" class="browser-default">
        <option value="Мастер" disabled selected>Мастер</option>
        <option v-for="employee in employeeArray" :key="employee._id" :value="employee._id">{{ employee.name }}</option>
      </select>
      <select v-model="form.program" class="browser-default">
        <option value="Название программы" disabled selected>Название программы</option>
        <option v-for="program in programArray" :key="program._id" :value="program._id">{{ program.name }}</option>
      </select>

      <div v-if="isProgramSelected" class="cost">

        <p>
        <span>
          Стоимость: {{ programCost.value_discounted }} руб.
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

        <div v-if="programCost.isDiscounted" class="discount_reason">
          <form action="#">
            <p>
              <label v-for="(discount_reason, idx) in discount_reason_array" :key="idx">
                <input :value="discount_reason" v-model="form.discount_reason" type="radio"/>
                <span>{{ discount_reason }}</span>
              </label>
            </p>
          </form>
        </div>

        <div v-if="form.discount_reason==='Другое'" class="discount_reason__text">
          <input placeholder="Обоснование" v-model="form.discount_reason_text" type="text"/>
        </div>

      </div>


    </div>
  </div>
  <button @click.stop="saveProgramPurchase" :disabled="!isFormValid" class="btn btn-small">Сохранить</button>

</template>

<script>
import { useStore } from 'vuex'
import { computed, reactive, watch } from 'vue'
import { useRoute } from 'vue-router'

export default {
  emits: ['close-add-program-form'],
  setup: function (_, { emit }) {
    const store = useStore()
    const route = useRoute()

    const ref_client = computed(() => route.params.id)
    const ref_day = computed(() => {
      if (store.getters.dayList) {
        return store.getters.dayList[0]._id
      } else {
        return null
      }
    })

    const discount_reason_array = [
      'Первый визит',
      'Купон',
      'Флайер',
      'VIP карта',
      'Другое'
    ]

    const initialForm = {
      cash: 'Выберите кассу',
      method: 'Способ оплаты',
      card: 'Карта',
      room: 'Выбор комнаты',
      service: 'Услуга',
      program: 'Название программы',
      master: 'Мастер',
      discount_reason: '',
      discount_reason_text: '',
      discount: '0'
    }
    const form = reactive({
      cash: initialForm.cash,
      method: initialForm.method,
      card: initialForm.card,
      room: initialForm.room,
      service: initialForm.service,
      program: initialForm.program,
      master: initialForm.master,
      discount_reason: initialForm.discount_reason,
      discount: initialForm.discount,
      discount_reason_text: initialForm.discount_reason_text
    })

    const clearForm = () => {
      form.cash = initialForm.cash
      form.method = initialForm.method
      form.card = initialForm.card
      form.master = initialForm.master
      form.program = initialForm.program
      form.discount = initialForm.discount
      form.discount_reason = initialForm.discount_reason
      form.discount_reason_text = initialForm.discount_reason_text
    }

    const discount_value = computed(() => parseInt(form.discount))

    watch(discount_value, newValue => {
      if (!newValue) {
        form.discount_reason = initialForm.discount_reason
      }
    })

    const isFormValid = computed(() => {
      const notValid =
          (form.cash === initialForm.cash) ||
          ((selectedMethod.value.name === 'Перевод на карту') && (form.card === initialForm.card)) ||
          (form.method === initialForm.method) ||
          (form.room === initialForm.room) ||
          (form.service === initialForm.service) ||
          (form.master === initialForm.master) ||
          (form.program === initialForm.program) ||
          ((programCost.value.isDiscounted) && (form.discount_reason === initialForm.discount_reason)) ||
          ((form.discount_reason === 'Другое') && (form.discount_reason_text===''))

      return !notValid
    })


    const programArray = computed(() => store.getters.programList)
    const cashArray = computed(() => store.getters.CASH_itemList)
    const cardArray = computed(() => store.getters.CARD_itemList)
    const methodArray = computed(() => store.getters.METHOD_itemList)
    const roomArray = computed(() => store.getters.ROOM_itemList)
    const serviceArray = computed(() => store.getters.SERVICE_itemList)
    const employeeArray = computed(() => store.getters.employeeList)
    const selectedCash = computed(() => cashArray.value.filter(item => item._id === form.cash)[0])
    const selectedCard = computed(() => cardArray.value.filter(item => item._id === form.card)[0])
    const selectedRoom = computed(() => roomArray.value.filter(item => item._id === form.room)[0])
    const selectedService = computed(() => serviceArray.value.filter(item => item._id === form.service)[0])
    const selectedMaster = computed(() => employeeArray.value.filter(item => item._id === form.master)[0])
    const selectedMethod = computed(() => methodArray.value.filter(item => item._id === form.method)[0])
    const selectedProgram = computed(() => programArray.value.filter(item => item._id === form.program)[0])
    const isProgramSelected = computed(() => form.program !== initialForm.program)
    const isCardMethod = computed(() => {
      if (form.method === initialForm.method) {
        return false
      }
      return selectedMethod.value.name === 'Перевод на карту'
    })

    const programCost = computed(() => {
      if (form.program === initialForm.program) {
        return {
          value: 0,
          value_discounted: 0,
          isDiscounted: parseInt(form.discount) > 0
        }
      }
      return {
        value: selectedProgram.value.cost,
        value_discounted: Math.floor(selectedProgram.value.cost * (1 - parseInt(form.discount) / 100)),
        isDiscounted: parseInt(form.discount) > 0
      }
    })

    const data2send = computed(() => {
      let data = {
        payment_category: 'program',
        payment_method_name: selectedMethod.value ? selectedMethod.value.name : '',
        payment_method_id: selectedMethod.value ? selectedMethod.value._id : '',
        cash_box_name: selectedCash.value ? selectedCash.value.name : '',
        cash_box_id: selectedCash.value ? selectedCash.value._id : '',
        room_id: selectedRoom.value ? selectedRoom.value._id : '',
        room_name: selectedRoom.value ? selectedRoom.value.name : '',
        service_id: selectedService.value ? selectedService.value._id : '',
        service_name: selectedService.value ? selectedService.value.name : '',
        item_id: selectedProgram.value ? selectedProgram.value._id : '',
        item_name: selectedProgram.value ? selectedProgram.value.name : '',
        item_cost: programCost.value ? programCost.value.value : 0,
        item_cost_discounted: programCost.value ? programCost.value.value_discounted : 0,
        employee_id: selectedMaster.value ? selectedMaster.value._id : '',
        employee_name: selectedMaster.value ? selectedMaster.value.name : '',
        client_id: ref_client.value,
        day_id: ref_day.value
      }

      if (form.method === 'Перевод на карту') {
        data.card_name = selectedCard.value.name
        data.card_id = selectedCard.value._id
      }

      if (form.discount !== initialForm.discount) {
        data.payment_discount_value = parseInt(form.discount) / 100
        data.payment_discount_reason = form.discount_reason
      }

      if (form.discount_reason === 'Другое') {
        data.payment_discount_reason_text = form.discount_reason_text
      }

      return data
    })

    const saveProgramPurchase = async () => {
      await store.dispatch('PURCHASE_CREATE', data2send.value)
      console.log(data2send.value)
      clearForm()
      emit('close-add-program-form')
    }

    return {
      saveProgramPurchase,
      initialForm,
      form,
      isCardMethod,
      cashArray,
      methodArray,
      cardArray,
      programArray,
      data2send,
      roomArray,
      serviceArray,
      employeeArray,
      isFormValid,
      discount_value,

      selectedCard,
      selectedMethod,
      selectedCash,
      selectedProgram,
      selectedMaster,
      selectedRoom,
      selectedService,
      discount_reason_array,
      isProgramSelected,
      programCost,
      ref_client,
      ref_day,
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