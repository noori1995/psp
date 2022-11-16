<template>
  <div>
    <Form
      v-slot="{ meta }"
      :validation-schema="simpleSchema"
      @submit="submitForm"
      ref="form"
    >
      <div class="d-flex w-50 m-auto mb-3">
        <Field name="id" type="number" class="form-control" placeholder="id" />
        <Field
          name="type"
          type="text"
          class="form-control"
          placeholder="type"
        />
        <Field
          name="currency_code"
          type="number"
          class="form-control"
          placeholder="currency_code"
        />
        <Field
          name="amount"
          type="number"
          class="form-control"
          placeholder="amount"
        />
        <Field
          name="channel_id"
          type="text"
          class="form-control"
          placeholder="channel_id"
        />
        <button
          ref="button"
          type="submit"
          class="btn btn-primary mx-2"
          :disabled="!meta.valid"
        >
          Find
        </button>
      </div>
    </Form>
    <div v-if="isLoading">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div v-else-if="transactionsList">
      <h2>Transactions</h2>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">id</th>
            <th scope="col">type</th>
            <th scope="col">currency_code</th>
            <th scope="col">amount</th>
            <th scope="col">channel_id</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(transaction, index) in transactionsListComputed"
            :key="transaction.id"
          >
            <th scope="row" v-text="index + 1" />
            <td v-text="transaction.id" />
            <td v-text="transaction.type" />
            <td v-text="transaction.currency_code" />
            <td v-text="transaction.amount" />
            <td v-text="transaction.channel_id" />
          </tr>
        </tbody>
      </table>
      <nav class="d-flex">
        <ul class="pagination m-auto">
          <li v-for="page in available_pages" :key="page" class="page-item" :class="current_page === page ? 'active' : ''" @click="selectPage(page)"><label class="page-link">{{page}}</label></li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { Form, Field } from "vee-validate";
import * as yup from "yup";
export default {
  components: {
    Form,
    Field,
  },
  data() {
    return {
      simpleSchema: {
        transaction_id: yup.number(),
      },
      available_pages: [1,2,3],
      current_page: 1,
      page_size: 10,
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters(["transactionsList"]),
    transactionsListComputed() {
      if (!Array.isArray(this.transactionsList)) {
        return [this.transactionsList];
      } else {
        return this.transactionsList;
      }
    },
  },
  methods: {
    ...mapActions(["getTransactionsList"]),
    editData(data) {
      if (+data == data) {
        return +data;
      } else return data;
    },
    async selectPage(page){
      this.current_page = +page
      this.$refs.button.click()
    },
    async submitForm(form) {
      this.isLoading = true;
      try {
        const body = {
          transaction: {
            offset: (this.current_page - 1) * this.page_size,
            page_size: this.page_size,
          },
        };
        for (const field in form) {
          if (form[field]) {
            body.transaction[field] = this.editData(form[field]);
          }
        }
        await this.getTransactionsList({
          body: body,
        });
      } catch (err) {
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
