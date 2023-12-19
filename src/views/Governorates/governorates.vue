<template>
    <div id="governorates">
      <div class="container">
        <!-- Add Edit Section -->
        <!-- @submit="onSubmit" @reset="onReset" -->
        <div class="add-section">
          <b-modal id="governorates-modal" title="Governorates" @ok="submit">
            <b-form class="d-grid grid-cols-1 gap-5">
              <div class="feild">
                <label for="">Arabic Name</label>
                <b-form-input
                  type="text"
                  placeholder="Enter Arabic Name"
                  v-model="payload.ar_name"
                  required
                ></b-form-input>
              </div>
              <div class="feild">
                <label for="">English Name</label>
                <b-form-input
                  type="text"
                  placeholder="Enter English Name"
                  v-model="payload.en_name"
                  required
                ></b-form-input>
              </div>
              <div class="feild">
                <label for="">Kurdish Name</label>
                <b-form-input
                  type="text"
                  placeholder="Enter Kurdish Name"
                  v-model="payload.kr_name"
                  required
                ></b-form-input>
              </div>
            </b-form>
          </b-modal>
        </div>
        <!-- Filters Section -->
        <div class="filters-section">
          <iq-card class="w-100">
            <template v-slot:body>
              <div class="filter-container" @change="filtering">
                <b-form-input
                  type="text"
                  placeholder="Filter By Name"
                  v-model="filterData.name"
                  required
                ></b-form-input>
              </div>
            </template>
          </iq-card>
        </div>
        <!-- Tabel Section -->
        <div class="table-sections">
          <iq-card>
            <template v-slot:headerTitle>
              <h4 class="card-title">Governorates List</h4>
            </template>
            <template v-slot:headerAction>
              <b-button variant="primary" @click="addInit" size="sm">New Governorat</b-button>
            </template>
            <template v-slot:body>
              <b-table responsive :items="governorates.data" :fields="fields" class="mb-0 table-borderless">
                <template v-slot:cell(actions)="data">
                    <div class="actions-list d-flex align-items-center">
                      <b-button variant=" iq-bg-success"  size="md" @click="update(data.item)"><i class="ri-ball-pen-fill p-0"></i></b-button>
                      <b-button variant=" iq-bg-danger"  size="md" @click="remove(data.item.id)"><i class="ri-delete-bin-line p-0"></i></b-button>
                    </div>
                  </template>
              </b-table>
            </template>
          </iq-card>
        </div>
        <!-- Pagination Section -->
        <div class="pagination">
          <iq-card class="w-100 d-flex justify-content-center">
            <template v-slot:body>
              <b-pagination
                  v-model="current_page"
                  :total-rows="governorates.total"
                  :per-page="filterData.take"
              ></b-pagination>
            </template>
          </iq-card>
        </div>
      </div>
    </div>
  </template>
<script>
export default {
  name: 'governorates',
  data () {
    return {
      current_page: 1,
      filterData: {
        skip: 0,
        take: 10,
        name: ''
      },
      payload: {
        ar_name: '',
        en_name: '',
        kr_name: '',
        image: ''
      }
    }
  },
  computed: {
    fields () {
      return [
        {
          label: 'Arabic Name',
          key: 'ar_name'
        },
        {
          label: 'English Name',
          key: 'en_name'
        },
        {
          label: 'Kurdish Name',
          key: 'kr_name'
        },
        {
          label: 'Kurdish Name',
          key: 'kr_name'
        },
        {
          label: 'Created Date',
          key: 'created_at'
        },
        {
          label: 'Created By',
          key: 'created_by.name'
        },
        {
          label: 'Updated Date',
          key: 'updated_at'
        },
        {
          label: 'Updated By',
          key: 'updated_by.name'
        },
        {
          label: 'Actions',
          key: 'actions'
        }
      ]
    }
  },
  methods: {
    filtering () {
      this.getGovernorates(this.filterData)
    },
    addInit () {
      this.$bvModal.show('governorates-modal')
    },
    update (data) {
      Object.assign(this.payload, data)
      this.$bvModal.show('governorates-modal')
    },
    remove (id) {
      this.confermMsg(() => {
        this.removeGovernorates(id)
      })
    },
    submit (bvModalEvent) {
      bvModalEvent.preventDefault()
      if (!this.payload.id) {
        this.addGovernorates(this.payload).then(() => {
          this.$bvModal.hide('governorates-modal')
          this.payload = this.resetObject(this.payload)
        })
      } else {
        this.updateGovernorates(this.payload).then(() => {
          this.payload = this.resetObject(this.payload)
          this.$bvModal.hide('governorates-modal')
        })
      }
    },
    changeStatus () {}
  },
  watch: {
    current_page: {
      handler: function (value) {
        console.log(value)
        this.filterData.skip = value === 1 ? 0 : (this.filterData.take * value) - this.filterData.take
        this.filtering()
      },
      deep: true
    }
  },
  mounted () {
    this.getGovernorates()
  }
}
</script>
