import axios, { AxiosResponse } from 'axios'
import { BoardType } from './postsService'
import { instance } from 'configs/axios'
import { AddTogetherType, UpdateTogetherType } from 'types/community-type/togetherType'
import dateformat from 'utils/dateFormat'

interface addParam {
  aptId: string
  boardType: BoardType
  data: AddTogetherType
}

interface getParam {
  boardType: BoardType
  aptId: string
  postId: string
}

interface updateParam {
  aptId: string
  boardType: BoardType
  data: UpdateTogetherType
  postId: string
}

interface deleteParam {
  boardType: BoardType
  postId: string
}

export const togetherService = {
  async addPost(param: addParam) {
    const { aptId, boardType, data } = param
    const {
      category,
      title,
      content,
      thumbnail,
      description,
      recruitFrom,
      recruitTo,
      meetTime,
      target,
      location,
      contributeStatus,
    } = data

    try {
      await instance(`/api/${aptId}/${boardType}`, {
        method: 'post',
        data: {
          category,
          title,
          content,
          thumbnail,
          description,
          recruitFrom: dateformat(recruitFrom.toString()),
          recruitTo: dateformat(recruitTo.toString()),
          meetTime,
          target,
          location,
          contributeStatus,
        },
      })
      return {
        statusCode: 201,
        message: '게시물이 등록되었습니다. 커뮤니티로 이동합니다.',
      }
    } catch (error) {
      console.error(error)
      if (axios.isAxiosError(error)) {
        return {
          statusCode: 500,
          message: '게시물 등록에 실패하였습니다. 다시 시도해주세요.',
        }
      } else {
        throw new Error('different error than axios')
      }
    }
  },

  async getPost(param: getParam) {
    const { boardType, aptId, postId } = param
    try {
      const response: AxiosResponse = await instance(
        `/api/${aptId}/${boardType}/${postId}`,
        {
          method: 'get',
        },
      )
      return response.data
    } catch (error) {
      console.error(error)
    }
  },

  async updatePost(param: updateParam) {
    const { aptId, boardType, data, postId } = param
    const {
      category,
      title,
      content,
      thumbnail,
      description,
      recruitFrom,
      recruitTo,
      meetTime,
      target,
      location,
      contributeStatus,
      recruitStatus,
    } = data

    try {
      await instance(`/api/${aptId}/${boardType}/${postId}`, {
        method: 'put',
        data: {
          category,
          title,
          content,
          thumbnail,
          description,
          recruitFrom: dateformat(recruitFrom.toString()),
          recruitTo: dateformat(recruitTo.toString()),
          meetTime,
          target,
          location,
          contributeStatus,
          recruitStatus,
        },
      })
      return {
        statusCode: 201,
        message: '게시물이 수정되었습니다. 수정된 게시물로 이동합니다.',
      }
    } catch (error) {
      console.error(error)
      if (axios.isAxiosError(error)) {
        return {
          statusCode: 500,
          message: '게시물 수정에 실패하였습니다. 다시 시도해주세요.',
        }
      } else {
        throw new Error('different error than axios')
      }
    }
  },

  async deletePost(param: deleteParam) {
    const { boardType, postId } = param
    try {
      await instance(`/api/${boardType}?${boardType}Id=${postId}`, {
        method: 'delete',
      })
      return {
        statusCode: 204,
        message: '게시물이 삭제되었습니다. 커뮤니티로 이동합니다.',
      }
    } catch (error) {
      console.error(error)
      if (axios.isAxiosError(error)) {
        return {
          statusCode: 500,
          message: '게시물 삭제에 실패하였습니다. 다시 시도해주세요.',
        }
      } else {
        throw new Error('different error than axios')
      }
    }
  },
}
