<template>
  <div class="flex-1 p-6">
    <div class="flex flex-col md:flex-row gap-6">
      <!-- Questions Section -->
      <div class="flex-1 pr-4">
        <div class="flex justify-between items-center mb-4">
          <h1 class="text-2xl font-bold text-gray-800 flex items-center">
            <i class="fas fa-question-circle text-purple-600 mr-2"></i>
            Newest Questions
          </h1>
          <Button
            @click="openAddQuestionDialog"
            class="bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <i class="fas fa-plus-circle mr-2"></i>
            Ask Question
          </Button>
        </div>

        <div class="text-sm text-gray-600 mb-4 flex items-center">
          <i class="fas fa-chart-bar text-purple-500 mr-2"></i>
          <span class="font-medium">{{ totalQuestions.toLocaleString() }}</span>
          questions asked
        </div>

        <!-- Tabs -->
        <div class="relative border-b border-gray-200 mb-4">
          <div class="flex">
            <button
              v-for="tab in tabs"
              :key="tab.value"
              :class="[
                'py-2 px-4 transition-colors duration-200 flex items-center',
                activeTab === tab.value
                  ? 'border-b-2 border-purple-600 text-purple-600 font-medium'
                  : 'text-gray-600 hover:text-gray-800',
              ]"
              @click="activeTab = tab.value"
            >
              <i :class="['mr-1', tab.icon]"></i>
              {{ tab.label }}
            </button>
            <div class="ml-auto flex items-center">
              <button
                class="flex items-center border border-gray-300 rounded px-3 py-1 text-sm hover:bg-gray-50 transition-colors duration-200"
              >
                <i class="fas fa-filter mr-1 text-gray-500"></i>
                Filter
              </button>
            </div>
          </div>
        </div>

        <!-- Questions List with Transition Group -->
        <transition-group name="question-list" tag="div" class="space-y-6">
          <div
            v-for="question in filteredQuestions"
            :key="question.id"
            class="border border-gray-200 rounded-xl p-5 question-card mb-4 bg-white shadow-sm hover:shadow-md transition-all duration-300"
          >
            <!-- Question Content -->
            <div class="flex flex-col">
              <div class="mb-3 flex justify-between items-start">
                <h3
                  class="text-blue-600 font-medium text-lg hover:text-blue-800 transition-colors duration-200 cursor-pointer"
                  @click="viewQuestionDetails(question)"
                >
                  {{ question.title }}
                </h3>
                <span
                  v-if="question.isBounty"
                  class="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center font-medium text-xs ml-2 whitespace-nowrap"
                >
                  <i class="fas fa-gift mr-1"></i>
                  +{{ question.bountyAmount }}
                </span>
              </div>

              <p class="text-sm text-gray-700 mb-4 line-clamp-3">
                {{ question.description }}
              </p>

              <div class="flex flex-wrap gap-2 mb-4">
                <span
                  v-for="(tag, index) in question.tags"
                  :key="index"
                  class="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full tag cursor-pointer hover:bg-blue-100 transition-colors"
                >
                  {{ tag }}
                </span>
              </div>

              <!-- Question Footer with Enhanced Voting Controls -->
              <div class="flex flex-wrap items-center border-t pt-4 mt-auto">
                <!-- Left side: user info and time -->
                <div class="flex items-center mr-auto mb-3 md:mb-0">
                  <img
                    v-if="question.userAvatar"
                    :src="question.userAvatar"
                    alt="User"
                    class="w-6 h-6 rounded-full mr-1 border border-gray-200"
                  />
                  <span class="text-gray-700 text-xs mr-3">{{
                    question.userName
                  }}</span>
                  <span class="text-gray-500 text-xs flex items-center">
                    <i class="far fa-clock mr-1"></i>
                    {{ formatTime(question.time) }}
                  </span>
                </div>

                <!-- Right side: stats and voting -->
                <div
                  class="flex items-center w-full sm:w-auto justify-between sm:justify-start"
                >
                  <!-- Stats -->
                  <div class="flex items-center space-x-4 mr-4">
                    <div class="flex items-center">
                      <div class="stats-bubble bg-blue-50">
                        <i class="fas fa-comment-alt text-blue-500"></i>
                      </div>
                      <span class="text-xs ml-1 text-gray-600">{{
                        question.answers
                      }}</span>
                    </div>

                    <div class="flex items-center">
                      <div class="stats-bubble bg-purple-50">
                        <i class="fas fa-eye text-purple-500"></i>
                      </div>
                      <span class="text-xs ml-1 text-gray-600">{{
                        question.views
                      }}</span>
                    </div>
                  </div>

                  <!-- Enhanced voting controls -->
                  <div class="vote-controls-container">
                    <div class="vote-count-display">
                      <transition name="vote-count">
                        <span :key="question.votes">
                          {{ question.votes }}
                        </span>
                      </transition>
                    </div>

                    <div class="voting-buttons">
                      <button
                        @click="upvoteQuestion(question)"
                        class="vote-button"
                        :class="{ 'vote-active': question.userVote === 1 }"
                        aria-label="Upvote"
                      >
                        <div class="vote-button-inner upvote">
                          <svg
                            viewBox="0 0 24 24"
                            class="vote-icon"
                            width="16"
                            height="16"
                          >
                            <path d="M12,3.5L6,10h3v7h6v-7h3L12,3.5z" />
                          </svg>
                        </div>
                        <div
                          class="vote-ripple upvote-ripple"
                          v-if="question.userVote === 1"
                        ></div>
                        <div
                          class="vote-particles"
                          v-if="question.userVote === 1"
                        >
                          <div
                            v-for="n in 8"
                            :key="`up-${n}`"
                            class="particle upvote-particle"
                          ></div>
                        </div>
                      </button>

                      <button
                        @click="downvoteQuestion(question)"
                        class="vote-button"
                        :class="{ 'vote-active': question.userVote === -1 }"
                        aria-label="Downvote"
                      >
                        <div class="vote-button-inner downvote">
                          <svg
                            viewBox="0 0 24 24"
                            class="vote-icon"
                            width="16"
                            height="16"
                          >
                            <path d="M12,20.5L18,14h-3V7h-6v7H6L12,20.5z" />
                          </svg>
                        </div>
                        <div
                          class="vote-ripple downvote-ripple"
                          v-if="question.userVote === -1"
                        ></div>
                        <div
                          class="vote-particles"
                          v-if="question.userVote === -1"
                        >
                          <div
                            v-for="n in 8"
                            :key="`down-${n}`"
                            class="particle downvote-particle"
                          ></div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition-group>

        <!-- Pagination -->
        <div class="mt-6 flex justify-between items-center">
          <button
            class="px-3 py-1 border border-gray-300 rounded text-sm flex items-center text-gray-600 hover:bg-gray-50"
          >
            <i class="fas fa-chevron-left mr-1"></i> Previous
          </button>
          <div class="flex space-x-1">
            <button
              v-for="page in 5"
              :key="page"
              :class="[
                'w-8 h-8 flex items-center justify-center rounded text-sm',
                page === currentPage
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100',
              ]"
              @click="currentPage = page"
            >
              {{ page }}
            </button>
            <span class="w-8 h-8 flex items-center justify-center text-gray-600"
              >...</span
            >
            <button
              class="w-8 h-8 flex items-center justify-center rounded text-sm text-gray-600 hover:bg-gray-100"
            >
              10
            </button>
          </div>
          <button
            class="px-3 py-1 border border-gray-300 rounded text-sm flex items-center text-gray-600 hover:bg-gray-50"
          >
            Next <i class="fas fa-chevron-right ml-1"></i>
          </button>
        </div>
      </div>

      <!-- Right Sidebar -->
      <div class="w-full md:w-64 space-y-6">
        <!-- Blog Section -->
        <div
          class="bg-blue-50 rounded-lg p-4 border border-blue-100 transform transition-all duration-300 hover:shadow-md"
        >
          <h3 class="font-medium mb-3 flex items-center text-blue-800">
            <i class="fas fa-rss text-blue-600 mr-2"></i>
            The Overflow Blog
          </h3>
          <ul class="space-y-3 text-sm">
            <li
              v-for="post in blogPosts"
              :key="post.id"
              class="flex transform transition hover:translate-x-1"
            >
              <span class="text-blue-500 mr-2">
                <i class="fas fa-newspaper"></i>
              </span>
              <a
                href="#"
                class="text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                {{ post.title }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Collectives Section -->
        <div>
          <div class="flex justify-between items-center mb-3">
            <h3 class="font-medium flex items-center">
              <i class="fas fa-users text-purple-600 mr-2"></i>
              Collectives
            </h3>
            <a
              href="#"
              class="text-xs text-blue-500 hover:text-blue-700 transition-colors duration-200"
              >see all</a
            >
          </div>
          <div class="space-y-3">
            <div
              v-for="collection in collections"
              :key="collection.id"
              class="border border-gray-200 rounded-lg p-3 bg-white collection-card"
            >
              <div class="flex justify-between items-center mb-2">
                <div class="font-medium flex items-center">
                  <i :class="['mr-2', collection.icon]"></i>
                  {{ collection.title }}
                </div>
                <div
                  v-if="collection.hot"
                  class="px-2 py-0.5 rounded text-xs bg-orange-100 text-orange-800 flex items-center"
                >
                  <i class="fas fa-fire-alt mr-1"></i> HOT
                </div>
              </div>
              <p class="text-xs text-gray-600">
                {{ collection.description }}
              </p>
              <div
                class="mt-2 text-xs text-blue-500 cursor-pointer hover:text-blue-700 transition-colors duration-200"
              >
                <i class="fas fa-arrow-right mr-1"></i> Join this collective
              </div>
            </div>
          </div>
        </div>

        <!-- Tags Section -->
        <div>
          <div class="flex justify-between items-center mb-3">
            <h3 class="font-medium flex items-center">
              <i class="fas fa-tags text-purple-600 mr-2"></i>
              Popular Tags
            </h3>
          </div>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="(count, tag) in popularTags"
              :key="tag"
              class="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded flex items-center tag cursor-pointer"
            >
              {{ tag }}
              <span class="ml-1 text-gray-500">{{ count }}</span>
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Question Dialog -->
    <Dialog
      :open="showAddQuestionDialog"
      @update:open="showAddQuestionDialog = $event"
    >
      <DialogContent class="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle class="flex items-center">
            <i class="fas fa-plus-circle text-purple-600 mr-2"></i>
            Ask an Academic Question
          </DialogTitle>
          <DialogDescription>
            Fill in the details below to ask your academic question. Be specific
            and include all relevant information.
          </DialogDescription>
        </DialogHeader>

        <form @submit.prevent="submitQuestion" class="space-y-4">
          <div class="space-y-2">
            <Label for="question-title">Question Title</Label>
            <Input
              id="question-title"
              v-model="newQuestion.title"
              placeholder="What's your academic question? Be specific."
              required
            />
            <p class="text-xs text-gray-500">
              Your title should summarize the inquiry. Good titles are specific
              and attention-grabbing.
            </p>
          </div>

          <div class="space-y-2">
            <Label for="question-description">Description</Label>
            <Textarea
              id="question-description"
              v-model="newQuestion.description"
              placeholder="Provide details about your academic inquiry, including relevant background information."
              rows="6"
              required
            />
            <p class="text-xs text-gray-500">
              Include all the information someone would need to answer your
              question.
            </p>
          </div>

          <div class="space-y-2">
            <Label for="file-upload">Attachments</Label>
            <div class="flex items-center space-x-2">
              <Button
                type="button"
                variant="outline"
                @click="triggerFileInput"
                class="text-sm"
              >
                <i class="fas fa-paperclip mr-2"></i>
                Attach Files
              </Button>
              <input
                ref="fileInput"
                type="file"
                @change="handleFileUpload"
                multiple
                class="hidden"
              />
              <span class="text-xs text-gray-500">
                You can upload PDF, DOC, JPG, PNG (max 10MB each)
              </span>
            </div>

            <div
              v-if="newQuestion.files && newQuestion.files.length > 0"
              class="mt-2"
            >
              <div
                v-for="(file, index) in newQuestion.files"
                :key="index"
                class="flex items-center justify-between bg-gray-50 p-2 rounded mb-1"
              >
                <div class="flex items-center">
                  <i class="fas fa-file text-gray-600 mr-2"></i>
                  <span class="text-sm truncate max-w-xs">{{ file.name }}</span>
                  <span class="text-xs text-gray-500 ml-2"
                    >({{ formatFileSize(file.size) }})</span
                  >
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  @click="removeFile(index)"
                  class="text-red-500 hover:text-red-700"
                >
                  <i class="fas fa-times"></i>
                </Button>
              </div>
            </div>
          </div>

          <div class="space-y-2">
            <Label for="question-tags">Input Course Codes</Label>
            <Input
              id="question-tags"
              v-model="newQuestion.tagsInput"
              placeholder="e.g.CSC213, MTH101 (separate with spaces)"
            />
            <div
              v-if="newQuestion.parsedTags.length > 0"
              class="flex flex-wrap gap-2 mt-2"
            >
              <span
                v-for="(tag, index) in newQuestion.parsedTags"
                :key="index"
                class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded flex items-center"
              >
                {{ tag }}
                <button
                  @click="removeTag(index)"
                  class="ml-1 text-blue-600 hover:text-blue-800"
                  type="button"
                >
                  <i class="fas fa-times-circle"></i>
                </button>
              </span>
            </div>
            <p class="text-xs text-gray-500">
              Add up to 5 subject areas to categorize your question.
            </p>
          </div>
          <div v-if="newQuestion.hasBounty" class="space-y-2">
            <Label for="bounty-amount">Bounty Amount</Label>
            <div class="flex items-center space-x-2">
              <Input
                id="bounty-amount"
                v-model="newQuestion.bountyAmount"
                type="number"
                min="50"
                max="500"
                placeholder="50"
                class="w-24"
              />
              <span class="text-sm text-gray-600">reputation points</span>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              @click="closeAddQuestionDialog"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              class="bg-purple-600 hover:bg-purple-700 text-white"
            >
              <i class="fas fa-paper-plane mr-2"></i>
              Post Question
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>

    <!-- Question Details Dialog -->
    <Dialog
      :open="showQuestionDetails"
      @update:open="showQuestionDetails = $event"
    >
      <DialogContent
        class="sm:max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-50 border-0 rounded-xl shadow-xl"
      >
        <DialogHeader class="border-b border-gray-200 pb-4">
          <DialogTitle
            class="text-2xl font-bold text-gray-900 flex items-center"
          >
            <span class="bg-blue-100 p-2 rounded-full text-blue-600 mr-3">
              <i class="fas fa-question-circle"></i>
            </span>
            {{ selectedQuestion?.title || "Question Details" }}
          </DialogTitle>
          <DialogDescription class="flex items-center text-gray-600">
            <i class="fas fa-clock mr-2 text-blue-500"></i>
            Asked
            <span class="font-medium mx-1">{{
              formatTime(selectedQuestion?.time)
            }}</span>
            by
            <span
              class="font-medium text-blue-600 ml-1 hover:underline cursor-pointer"
              >{{ selectedQuestion?.userName }}</span
            >
          </DialogDescription>
        </DialogHeader>

        <div v-if="selectedQuestion" class="space-y-8 py-4">
          <!-- Question content -->
          <div class="flex bg-white rounded-lg p-5 shadow-sm">
            <!-- Voting -->
            <div class="w-16 flex flex-col items-center mr-5">
              <button
                @click="upvoteQuestion(selectedQuestion)"
                :class="[
                  'fas fa-arrow-up text-2xl cursor-pointer p-2 rounded-full transition-all duration-200',
                  selectedQuestion.userVote === 1
                    ? 'text-orange-500 bg-orange-50'
                    : 'text-gray-400 hover:text-orange-500 hover:bg-orange-50',
                ]"
                aria-label="Upvote"
              ></button>
              <span class="text-xl font-semibold my-2 text-gray-700">{{
                selectedQuestion.votes
              }}</span>
              <button
                @click="downvoteQuestion(selectedQuestion)"
                :class="[
                  'fas fa-arrow-down text-2xl cursor-pointer p-2 rounded-full transition-all duration-200',
                  selectedQuestion.userVote === -1
                    ? 'text-blue-500 bg-blue-50'
                    : 'text-gray-400 hover:text-blue-500 hover:bg-blue-50',
                ]"
                aria-label="Downvote"
              ></button>
              <div class="border-t border-gray-200 w-8 my-4"></div>
              <button
                class="mt-2 text-gray-400 hover:text-yellow-500 transition-colors duration-200 p-2 rounded-full hover:bg-yellow-50"
                title="Bookmark"
              >
                <i class="fas fa-bookmark text-xl"></i>
              </button>
              <button
                class="mt-3 text-gray-400 hover:text-blue-500 transition-colors duration-200 p-2 rounded-full hover:bg-blue-50"
                title="History"
              >
                <i class="fas fa-history text-xl"></i>
              </button>
            </div>

            <!-- Question body -->
            <div class="flex-1">
              <div class="prose prose-blue max-w-none">
                <p class="text-gray-800 whitespace-pre-line text-lg">
                  {{ selectedQuestion.description }}
                </p>
              </div>

              <div class="flex flex-wrap gap-2 mt-6">
                <span
                  v-for="(tag, index) in selectedQuestion.tags"
                  :key="index"
                  class="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full tag cursor-pointer hover:bg-blue-200 transition-colors duration-200"
                >
                  <i class="fas fa-tag text-xs mr-1"></i> {{ tag }}
                </span>
              </div>

              <div class="flex justify-between items-center mt-8">
                <div class="flex space-x-4">
                  <button
                    class="text-blue-600 hover:text-blue-800 text-sm flex items-center hover:bg-blue-50 px-3 py-1 rounded-full transition-all duration-200"
                  >
                    <i class="fas fa-share-alt mr-2"></i> Share
                  </button>
                  <button
                    class="text-blue-600 hover:text-blue-800 text-sm flex items-center hover:bg-blue-50 px-3 py-1 rounded-full transition-all duration-200"
                  >
                    <i class="fas fa-edit mr-2"></i> Edit
                  </button>
                  <button
                    class="text-red-500 hover:text-red-700 text-sm flex items-center hover:bg-red-50 px-3 py-1 rounded-full transition-all duration-200"
                  >
                    <i class="fas fa-flag mr-2"></i> Report
                  </button>
                </div>

                <div
                  class="bg-blue-50 p-4 rounded-lg border border-blue-100 shadow-sm hover:shadow transition-shadow duration-200"
                >
                  <div class="flex items-center text-sm text-gray-700 mb-2">
                    <span class="text-gray-500 mr-1">Asked on</span>
                    <span class="font-medium">{{
                      formatDetailedDate(selectedQuestion.time)
                    }}</span>
                  </div>
                  <div class="flex items-center">
                    <div class="relative mr-3">
                      <img
                        v-if="selectedQuestion.userAvatar"
                        :src="selectedQuestion.userAvatar"
                        alt="User"
                        class="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                      />
                      <span
                        class="absolute -bottom-1 -right-1 bg-green-500 w-3 h-3 rounded-full border border-white"
                      ></span>
                    </div>
                    <div>
                      <div
                        class="font-medium text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                      >
                        {{ selectedQuestion.userName }}
                      </div>
                      <div class="text-xs text-gray-500 flex items-center">
                        <i class="fas fa-trophy text-yellow-500 mr-1"></i> 1,234
                        <span class="mx-1">•</span>
                        <i class="fas fa-star text-blue-500 mr-1"></i> Member
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Comments section -->
          <div class="border-t border-gray-200 pt-6">
            <h3
              class="font-semibold text-lg mb-4 flex items-center bg-gray-50 p-3 rounded-lg"
            >
              <i class="fas fa-comment-alt text-blue-500 mr-2"></i>
              {{ selectedQuestion.comments?.length || 0 }} Comments
            </h3>

            <div
              v-if="
                selectedQuestion.comments &&
                selectedQuestion.comments.length > 0
              "
              class="space-y-4"
            >
              <div
                v-for="(comment, index) in selectedQuestion.comments"
                :key="index"
                class="text-sm text-gray-700 p-4 border-l-4 border-blue-200 rounded-r-lg bg-white shadow-sm hover:shadow transition-shadow duration-200"
              >
                <p class="mb-2">{{ comment.text }}</p>
                <div
                  class="flex justify-between items-center mt-3 text-xs text-gray-500"
                >
                  <div class="flex items-center">
                    <img
                      :src="comment.userAvatar || '/api/placeholder/24/24'"
                      alt="User"
                      class="w-6 h-6 rounded-full mr-2"
                    />
                    <span
                      class="font-medium text-blue-600 hover:underline cursor-pointer"
                      >{{ comment.userName }}</span
                    >
                    <span class="mx-1">•</span>
                    <span>{{ formatTime(comment.time) }}</span>
                  </div>
                  <div class="flex items-center space-x-3">
                    <button
                      class="hover:text-blue-600 flex items-center transition-colors duration-200"
                    >
                      <i class="fas fa-arrow-up mr-1"></i> {{ comment.votes }}
                    </button>
                    <button
                      class="hover:text-blue-600 transition-colors duration-200 flex items-center"
                    >
                      <i class="fas fa-reply mr-1"></i> Reply
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              v-else
              class="text-gray-500 text-center py-8 bg-white rounded-lg shadow-sm"
            >
              <i class="fas fa-comments text-4xl mb-3 text-gray-300"></i>
              <p>No comments yet - be the first to add one!</p>
            </div>

            <div class="mt-5 bg-white p-4 rounded-lg shadow-sm">
              <label
                for="comment"
                class="block text-sm font-medium text-gray-700 mb-1"
                >Add a comment</label
              >
              <Textarea
                id="comment"
                placeholder="What do you think about this question?"
                class="w-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-md transition-all duration-200"
                rows="2"
              />
              <div class="flex justify-end mt-3">
                <Button
                  size="sm"
                  class="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4 py-2 transition-all duration-200 flex items-center"
                >
                  <i class="fas fa-comment mr-2"></i> Add Comment
                </Button>
              </div>
            </div>
          </div>

          <!-- Answers section -->
          <div class="border-t border-gray-200 pt-6">
            <h3
              class="font-semibold text-lg mb-6 flex items-center justify-between bg-gray-50 p-3 rounded-lg"
            >
              <div class="flex items-center">
                <i class="fas fa-comment-dots text-green-600 mr-2"></i>
                {{ selectedQuestion.answers || 0 }} Answers
              </div>
              <div class="flex items-center text-sm">
                <span class="mr-2 text-gray-600">Sort by:</span>
                <select
                  class="bg-white border border-gray-300 rounded-md text-sm p-1"
                >
                  <option>Votes</option>
                  <option>Newest</option>
                  <option>Oldest</option>
                </select>
              </div>
            </h3>

            <div v-if="answers && answers.length > 0" class="space-y-8">
              <div
                v-for="(answer, index) in answers"
                :key="index"
                class="border border-gray-200 rounded-xl p-5 bg-white shadow-sm hover:shadow transition-shadow duration-200"
                :class="{ 'border-green-300 bg-green-50': answer.accepted }"
              >
                <div class="flex">
                  <!-- Voting -->
                  <div class="w-16 flex flex-col items-center mr-5">
                    <button
                      @click="upvoteAnswer(answer)"
                      :class="[
                        'fas fa-arrow-up text-xl cursor-pointer p-2 rounded-full transition-all duration-200',
                        answer.userVote === 1
                          ? 'text-orange-500 bg-orange-50'
                          : 'text-gray-400 hover:text-orange-500 hover:bg-orange-50',
                      ]"
                      aria-label="Upvote"
                    ></button>
                    <span class="font-semibold my-1 text-lg">{{
                      answer.votes
                    }}</span>
                    <button
                      @click="downvoteAnswer(answer)"
                      :class="[
                        'fas fa-arrow-down text-xl cursor-pointer p-2 rounded-full transition-all duration-200',
                        answer.userVote === -1
                          ? 'text-blue-500 bg-blue-50'
                          : 'text-gray-400 hover:text-blue-500 hover:bg-blue-50',
                      ]"
                      aria-label="Downvote"
                    ></button>
                    <div class="border-t border-gray-200 w-8 my-4"></div>
                    <button
                      @click="toggleAcceptAnswer(answer)"
                      :class="[
                        'mt-2 p-2 rounded-full transition-all duration-200',
                        answer.accepted
                          ? 'text-green-500 bg-green-100'
                          : 'text-gray-400 hover:text-green-500 hover:bg-green-50',
                      ]"
                      :title="
                        answer.accepted ? 'Accepted answer' : 'Mark as accepted'
                      "
                    >
                      <i class="fas fa-check-circle text-xl"></i>
                    </button>
                  </div>

                  <!-- Answer body -->
                  <div class="flex-1">
                    <div class="prose prose-blue max-w-none">
                      <p class="text-gray-800">
                        {{ answer.text }}
                      </p>
                    </div>

                    <div class="flex justify-between items-center mt-8">
                      <div class="flex space-x-4">
                        <button
                          class="text-blue-600 hover:text-blue-800 text-sm flex items-center hover:bg-blue-50 px-3 py-1 rounded-full transition-all duration-200"
                        >
                          <i class="fas fa-share-alt mr-2"></i> Share
                        </button>
                        <button
                          class="text-blue-600 hover:text-blue-800 text-sm flex items-center hover:bg-blue-50 px-3 py-1 rounded-full transition-all duration-200"
                        >
                          <i class="fas fa-edit mr-2"></i> Edit
                        </button>
                        <button
                          v-if="answer.accepted"
                          class="text-green-600 text-sm flex items-center bg-green-50 px-3 py-1 rounded-full"
                        >
                          <i class="fas fa-check-circle mr-2"></i> Accepted
                          Answer
                        </button>
                      </div>

                      <div
                        class="bg-blue-50 p-4 rounded-lg border border-blue-100 shadow-sm"
                      >
                        <div
                          class="flex items-center text-sm text-gray-700 mb-2"
                        >
                          <span class="text-gray-500 mr-1">Answered</span>
                          <span class="font-medium">{{
                            formatDetailedDate(answer.time)
                          }}</span>
                        </div>
                        <div class="flex items-center">
                          <img
                            :src="answer.userAvatar || '/api/placeholder/30/30'"
                            alt="User"
                            class="w-10 h-10 rounded-full border-2 border-white shadow-sm mr-3"
                          />
                          <div>
                            <div
                              class="font-medium text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                            >
                              {{ answer.userName }}
                            </div>
                            <div
                              class="text-xs text-gray-500 flex items-center"
                            >
                              <i class="fas fa-trophy text-yellow-500 mr-1"></i>
                              {{ answer.reputation }}
                              <span class="mx-1">•</span>
                              <span
                                v-if="answer.reputation > 5000"
                                class="text-green-600 font-medium flex items-center"
                              >
                                <i class="fas fa-medal mr-1"></i> Expert
                              </span>
                              <span v-else class="text-blue-600 font-medium"
                                >Regular</span
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              v-else
              class="text-gray-500 text-center py-12 bg-white rounded-lg shadow-sm"
            >
              <i class="fas fa-comment-slash text-5xl mb-4 text-gray-300"></i>
              <p class="text-lg">
                No answers yet - be the first to answer this question!
              </p>
            </div>

            <!-- Your Answer section -->
            <div
              class="mt-10 bg-white p-6 rounded-xl shadow-sm border border-gray-200"
            >
              <h3
                class="font-semibold text-xl mb-4 flex items-center text-blue-800"
              >
                <i class="fas fa-pen-fancy mr-2 text-blue-600"></i> Your Answer
              </h3>
              <div
                class="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all duration-200"
              >
                <div class="bg-gray-50 border-b border-gray-300 p-2 flex">
                  <button
                    class="p-1 mx-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded"
                  >
                    <i class="fas fa-bold"></i>
                  </button>
                  <button
                    class="p-1 mx-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded"
                  >
                    <i class="fas fa-italic"></i>
                  </button>
                  <button
                    class="p-1 mx-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded"
                  >
                    <i class="fas fa-link"></i>
                  </button>
                  <button
                    class="p-1 mx-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded"
                  >
                    <i class="fas fa-code"></i>
                  </button>
                  <button
                    class="p-1 mx-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded"
                  >
                    <i class="fas fa-list"></i>
                  </button>
                </div>
                <Textarea
                  v-model="newAnswer"
                  placeholder="Write your answer here... Be specific and explain step by step."
                  class="w-full border-0 focus:ring-0"
                  rows="8"
                />
              </div>
              <div class="flex justify-between items-center mt-4">
                <div class="text-sm text-gray-500 flex items-center">
                  <i class="fas fa-markdown mr-2 text-blue-500"></i> Markdown
                  supported
                  <span class="mx-2">•</span>
                  <i class="fas fa-eye mr-2 text-blue-500"></i>
                  <a href="#" class="text-blue-600 hover:underline">Preview</a>
                </div>
                <Button
                  @click="submitAnswer"
                  class="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full shadow hover:shadow-md transition-all duration-200 flex items-center"
                >
                  <i class="fas fa-paper-plane mr-2"></i> Post Your Answer
                </Button>
              </div>
              <div class="mt-6 text-sm text-gray-500 bg-blue-50 p-4 rounded-lg">
                <p class="flex items-start">
                  <i class="fas fa-lightbulb text-yellow-500 mr-2 mt-1"></i>
                  <span
                    >Your answer should be detailed and helpful. Include code
                    examples, explanations, and references if applicable. The
                    more specific you are, the more likely your answer will be
                    accepted!</span
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>

<style>
/* Enhanced animations for question list */
/* Card animations */
.question-list-enter-active,
.question-list-leave-active {
  transition: all 0.5s ease;
}
.question-list-enter-from,
.question-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.question-card {
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
}

.question-card:hover {
  transform: translateY(-2px);
}

/* Stats bubbles */
.stats-bubble {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;
}

.stats-bubble:hover {
  transform: scale(1.1);
}

/* Vote controls container */
.vote-controls-container {
  display: flex;
  align-items: center;
  background-color: #f9fafb;
  border-radius: 20px;
  padding: 4px 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

/* Vote count display */
.vote-count-display {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  margin: 0 6px;
  font-weight: 600;
  font-size: 14px;
  overflow: hidden;
  position: relative;
}

.vote-count-enter-active {
  animation: vote-bounce 0.5s;
}
.vote-count-leave-active {
  position: absolute;
  animation: vote-fade-out 0.3s;
}

@keyframes vote-bounce {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  60% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes vote-fade-out {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0.8);
    opacity: 0;
  }
}

/* Voting buttons */
.voting-buttons {
  display: flex;
  gap: 4px;
}

.vote-button {
  position: relative;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: transform 0.15s ease;
}

.vote-button:hover {
  transform: scale(1.1);
}

.vote-button:active {
  transform: scale(0.95);
}

.vote-button-inner {
  position: relative;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 2;
}

.vote-button-inner.upvote {
  background-color: rgba(249, 115, 22, 0.1);
}

.vote-button-inner.downvote {
  background-color: rgba(59, 130, 246, 0.1);
}

.vote-button:hover .vote-button-inner.upvote {
  background-color: rgba(249, 115, 22, 0.2);
}

.vote-button:hover .vote-button-inner.downvote {
  background-color: rgba(59, 130, 246, 0.2);
}

.vote-icon {
  transition:
    fill 0.3s,
    transform 0.3s;
}

.vote-button-inner.upvote .vote-icon {
  fill: rgba(249, 115, 22, 0.7);
}

.vote-button-inner.downvote .vote-icon {
  fill: rgba(59, 130, 246, 0.7);
}

.vote-button:hover .vote-icon {
  transform: scale(1.1);
}

.vote-button:hover .vote-button-inner.upvote .vote-icon {
  fill: rgb(249, 115, 22);
}

.vote-button:hover .vote-button-inner.downvote .vote-icon {
  fill: rgb(59, 130, 246);
}

/* Active vote states */
.vote-button.vote-active .vote-button-inner.upvote {
  background-color: rgba(249, 115, 22, 0.3);
}

.vote-button.vote-active .vote-button-inner.downvote {
  background-color: rgba(59, 130, 246, 0.3);
}

.vote-button.vote-active .vote-button-inner.upvote .vote-icon {
  fill: rgb(249, 115, 22);
}

.vote-button.vote-active .vote-button-inner.downvote .vote-icon {
  fill: rgb(59, 130, 246);
}

/* Vote ripple effect */
.vote-ripple {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  width: 100%;
  height: 100%;
  border-radius: 50%;
  z-index: 1;
  animation: ripple 0.8s ease-out;
}

.upvote-ripple {
  background-color: rgba(249, 115, 22, 0.15);
}

.downvote-ripple {
  background-color: rgba(59, 130, 246, 0.15);
}
.tag:hover {
  transform: translateY(-1px);
}
@keyframes ripple {
  0% {
    transform: translate(-50%, -50%) scale(0);
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    transform: translate(-50%, -50%) scale(2.5);
    opacity: 0;
  }
}

/* Particle animations */
.vote-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.particle {
  position: absolute;
  width: 6px;
  height: 6px;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  opacity: 0;
}

.upvote-particle {
  background-color: rgb(249, 115, 22);
  animation: particle-shoot 0.6s ease-out forwards;
}

.downvote-particle {
  background-color: rgb(59, 130, 246);
  animation: particle-shoot 0.6s ease-out forwards;
}

@keyframes particle-shoot {
  0% {
    transform: translate(-50%, -50%);
    opacity: 1;
    width: 4px;
    height: 4px;
  }
}

/* Vote color classes */
.text-vote-positive {
  color: #16a34a;
}

.text-vote-negative {
  color: #dc2626;
}

.text-vote-neutral {
  color: #4b5563;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .vote-controls-container {
    margin-left: auto;
  }
}
</style>

<script setup>
import { ref, computed, watch } from "vue";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Toaster } from "@/components/ui/sonner";

// const toast = useToast();

const activeTab = ref("newest");
const currentPage = ref(1);
const totalQuestions = ref(2130);
const showAddQuestionDialog = ref(false);
const showQuestionDetails = ref(false);
const selectedQuestion = ref(null);
const newAnswer = ref("");

const tabs = [
  { label: "New", value: "newest", icon: "fas fa-clock" },
  { label: "Active", value: "active", icon: "fas fa-fire" },
  { label: "Answered", value: "answered", icon: "fas fa-check-circle" },
  { label: "More", value: "more", icon: "fas fa-ellipsis-h" },
];
const questions = ref([
  {
    id: 1,
    title: "How do I solve this integration question from MTH202?",
    description:
      "I'm stuck on this problem from MTH202: ∫(x^2 * e^x) dx. I know integration by parts is involved, but I’m getting confused after the first step.\n\nCan someone walk through the steps and also suggest any tricks to make these easier during exams?",
    tags: ["mth202", "calculus", "integration", "exam-tips"],
    votes: 18,
    answers: 4,
    views: 213,
    time: new Date(2025, 3, 10),
    userName: "mathWhiz",
    userAvatar: "/api/placeholder/30/30",
    isBounty: true,
    bountyAmount: 20,
    userVote: 0,
    comments: [
      {
        id: 1,
        text: "Try using LIATE rule to decide which function to integrate first.",
        userName: "calcTutor",
        time: new Date(2025, 3, 10, 15, 30),
        votes: 6,
      },
    ],
  },
  {
    id: 2,
    title: "What's the difference between BFS and DFS? CSE101 exam prep",
    description:
      "Preparing for the CSE101 exam and I’m a bit unsure about when to use BFS vs DFS. Any clear explanation or mnemonics would help. Also, if someone has past paper questions on this, please share!",
    tags: ["cse101", "algorithms", "dfs", "bfs", "exam-prep"],
    votes: 10,
    answers: 3,
    views: 175,
    time: new Date(2025, 3, 11),
    userName: "csFreshie",
    userAvatar: "/api/placeholder/30/30",
    isBounty: false,
    bountyAmount: 0,
    userVote: 1,
  },
  {
    id: 3,
    title: "How to approach case studies in BUS204?",
    description:
      "In BUS204, we’re given case studies to analyze company behavior. I always get stuck on how to structure the answer. Any tips or frameworks to follow for these?",
    tags: ["bus204", "case-studies", "business-analysis"],
    votes: 6,
    answers: 2,
    views: 98,
    time: new Date(2025, 3, 9),
    userName: "bizStudent",
    userAvatar: "/api/placeholder/30/30",
    isBounty: false,
    bountyAmount: 0,
    userVote: 0,
  },
]);

// Blog posts for sidebar
const blogPosts = ref([
  { id: 1, title: "Top 10 memory tricks for solving integration faster" },
  { id: 2, title: "Structuring your answers for business case studies" },
  { id: 3, title: "Surviving first-year computer science courses" },
]);

// Collections for sidebar
const collections = ref([
  {
    id: 1,
    title: "Math & Stats",
    icon: "fas fa-square-root-alt text-indigo-500",
    description: "Questions from MTH101, MTH202, STA203 and more",
    hot: true,
  },
  {
    id: 2,
    title: "Computer Science",
    icon: "fas fa-laptop-code text-blue-600",
    description: "Algorithm breakdowns, code explanations, and logic flow",
    hot: true,
  },
  {
    id: 3,
    title: "Business & Management",
    icon: "fas fa-briefcase text-green-600",
    description: "Case studies, strategy frameworks, and theory applications",
    hot: false,
  },
]);

// Popular tags
const popularTags = ref({
  mth202: 348,
  cse101: 289,
  sta203: 155,
  bus204: 141,
  eco110: 120,
  examtips: 486,
  studyhacks: 372,
});

// New question form data
const newQuestion = ref({
  title: "",
  description: "",
  tagsInput: "",
  parsedTags: [],
  hasBounty: false,
  bountyAmount: 10,
});

// Mock answers for the selected academic question
const answers = ref([
  {
    id: 1,
    text: "For ∫(x^2 * e^x) dx, use integration by parts twice. Let u = x^2 and dv = e^x dx.\n\n1. u = x^2, dv = e^x dx → du = 2x dx, v = e^x\n2. Apply integration by parts: uv - ∫v du\n   = x^2 * e^x - ∫2x * e^x dx\n3. Repeat parts on ∫2x * e^x\n\nThis gives: x^2 e^x - 2(x e^x - ∫e^x dx)\nFinal answer: x^2 e^x - 2x e^x + 2e^x + C",
    userName: "intMaster",
    userAvatar: "/api/placeholder/30/30",
    votes: 10,
    time: new Date(2025, 3, 10, 14, 0),
    userVote: 0,
    accepted: true,
    reputation: 934,
  },
  {
    id: 2,
    text: "There’s a trick with this type of problem: whenever you see a polynomial * exponential (like x^n * e^x), you're likely doing repeated integration by parts. Memorize the pattern to save time in exams.",
    userName: "examGuru",
    userAvatar: "/api/placeholder/30/30",
    votes: 6,
    time: new Date(2025, 3, 10, 18, 30),
    userVote: 0,
    accepted: false,
    reputation: 452,
  },
]);

// Watch for changes in the tagsInput to update parsedTags
watch(
  () => newQuestion.value.tagsInput,
  (newVal) => {
    if (newVal) {
      // Split by spaces and filter out empty strings
      newQuestion.value.parsedTags = newVal
        .split(" ")
        .filter((tag) => tag.trim() !== "")
        .slice(0, 5); // Limit to 5 tags
    } else {
      newQuestion.value.parsedTags = [];
    }
  },
);

// Computed property to filter questions based on active tab
const filteredQuestions = computed(() => {
  switch (activeTab.value) {
    case "newest":
      return [...questions.value].sort((a, b) => b.time - a.time);
    case "active":
      return [...questions.value].sort((a, b) => b.answers - a.answers);
    case "answered":
      return questions.value.filter((q) => q.answers > 0);
    default:
      return questions.value;
  }
});

// Format time as "X hours ago" or "X days ago"
const formatTime = (time) => {
  if (!time) return "unknown";

  const now = new Date();
  const diff = now - time;
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 60) {
    return `${minutes} min ago`;
  } else if (hours < 24) {
    return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  } else {
    return `${days} day${days === 1 ? "" : "s"} ago`;
  }
};

// Format date in a more detailed format
const formatDetailedDate = (time) => {
  if (!time) return "unknown";

  return time.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Functions for question interactions
const openAddQuestionDialog = () => {
  showAddQuestionDialog.value = true;
};

const closeAddQuestionDialog = () => {
  showAddQuestionDialog.value = false;
  // Reset form
  newQuestion.value = {
    title: "",
    description: "",
    tagsInput: "",
    parsedTags: [],
    hasBounty: false,
    bountyAmount: 50,
  };
};

const submitQuestion = () => {
  // Create a new question object
  const question = {
    id: questions.value.length + 1,
    title: newQuestion.value.title,
    description: newQuestion.value.description,
    tags: newQuestion.value.parsedTags,
    votes: 0,
    answers: 0,
    views: 0,
    time: new Date(),
    userName: "You", // In a real app, would use authenticated user
    userAvatar: "/api/placeholder/30/30",
    isBounty: newQuestion.value.hasBounty,
    bountyAmount: newQuestion.value.hasBounty
      ? newQuestion.value.bountyAmount
      : 0,
    userVote: 0,
    comments: [],
  };

  // Add to questions array
  questions.value.unshift(question);

  // Increment total questions count
  totalQuestions.value++;

  // Close dialog
  closeAddQuestionDialog();

  // Show success toast
  toast({
    title: "Question Posted",
    description: "Your question has been successfully posted.",
    variant: "success",
  });
};

const removeTag = (index) => {
  // Remove tag at given index
  newQuestion.value.parsedTags.splice(index, 1);

  // Update tags input string
  newQuestion.value.tagsInput = newQuestion.value.parsedTags.join(" ");
};

const viewQuestionDetails = (question) => {
  selectedQuestion.value = question;
  showQuestionDetails.value = true;

  // In a real app, would increment view count here
  question.views++;
};

const upvoteQuestion = (question) => {
  if (question.userVote === 1) {
    // Already upvoted, remove vote
    question.votes--;
    question.userVote = 0;
  } else {
    // Not upvoted yet
    if (question.userVote === -1) {
      // Was downvoted, remove downvote first
      question.votes++;
    }
    // Add upvote
    question.votes++;
    question.userVote = 1;
  }
};

const downvoteQuestion = (question) => {
  if (question.userVote === -1) {
    // Already downvoted, remove vote
    question.votes++;
    question.userVote = 0;
  } else {
    // Not downvoted yet
    if (question.userVote === 1) {
      // Was upvoted, remove upvote first
      question.votes--;
    }
    // Add downvote
    question.votes--;
    question.userVote = -1;
  }
};

const upvoteAnswer = (answer) => {
  if (answer.userVote === 1) {
    // Already upvoted, remove vote
    answer.votes--;
    answer.userVote = 0;
  } else {
    // Not upvoted yet
    if (answer.userVote === -1) {
      // Was downvoted, remove downvote first
      answer.votes++;
    }
    // Add upvote
    answer.votes++;
    answer.userVote = 1;
  }
};

const downvoteAnswer = (answer) => {
  if (answer.userVote === -1) {
    // Already downvoted, remove vote
    answer.votes++;
    answer.userVote = 0;
  } else {
    // Not downvoted yet
    if (answer.userVote === 1) {
      // Was upvoted, remove upvote first
      answer.votes--;
    }
    // Add downvote
    answer.votes--;
    answer.userVote = -1;
  }
};

const toggleAcceptAnswer = (answer) => {
  // In a real app, would check if user is question asker
  // Unaccept all other answers
  answers.value.forEach((a) => {
    if (a.id !== answer.id) {
      a.accepted = false;
    }
  });

  // Toggle accepted state of this answer
  answer.accepted = !answer.accepted;

  if (answer.accepted) {
    toast({
      title: "Answer Accepted",
      description: "You've marked this answer as accepted.",
      variant: "success",
    });
  }
};

const submitAnswer = () => {
  if (!newAnswer.value.trim()) {
    toast({
      title: "Empty Answer",
      description: "Please write something before submitting your answer.",
      variant: "warning",
    });
    return;
  }

  // Create new answer
  const answer = {
    id: answers.value.length + 1,
    text: newAnswer.value,
    userName: "You", // In a real app, would use authenticated user
    userAvatar: "/api/placeholder/30/30",
    votes: 0,
    time: new Date(),
    userVote: 0,
    accepted: false,
    reputation: 1000, // Mock reputation
  };

  // Add to answers array
  answers.value.push(answer);

  // Increment answer count on the question
  if (selectedQuestion.value) {
    selectedQuestion.value.answers = (selectedQuestion.value.answers || 0) + 1;

    // Find and update the question in the main list too
    const questionInList = questions.value.find(
      (q) => q.id === selectedQuestion.value.id,
    );
    if (questionInList) {
      questionInList.answers = selectedQuestion.value.answers;
    }
  }

  // Clear input
  newAnswer.value = "";

  // Show success toast
  Toaster({
    title: "Answer Posted",
    description: "Your answer has been successfully posted.",
    variant: "success",
  });
};
</script>
