import is from '@sindresorhus/is';
import { Router } from 'express';
import { adminOnly, loginRequired } from '../middlewares/index.js';
import { boardService } from '../services/board-service.js';

const boardRouter = Router();
/**
 * @swagger
 * tags:
 *   name: boards
 *   description: 게시판입니다.
 */

/**
 * @swagger
 * /api/boards:
 *   post:
 *     summary: 게시판 정보를 생성합니다.  -user or admin
 *     tags: [boards]
 *     security:
 *       - JWT: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/definitions/boards"
 *     responses:
 *       200:
 *         description: 반환 값으로 게시판정보를 반환합니다.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/boards'
 */
boardRouter.post('/', loginRequired, async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요',
      );
    }
    const userId = req.currentUserId;
    const { title, contents, isNotified } = req.body;
    const newBoard = await boardService.addBoard({
      userId,
      title,
      contents,
      isNotified,
    });
    res.send(newBoard);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/boards/{boardId}:
 *   patch:
 *     summary: 게시판 정보를 업데이트합니다.  -user or admin
 *     tags: [boards]
 *     security:
 *       - JWT: []
 *     parameters:
 *       - in: path
 *         name: boardId
 *         schema:
 *           type: string
 *         required: true
 *         description: 게시판 id 고유값을 입력하세요.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: "#/definitions/boards"
 *     responses:
 *       200:
 *         description: 게시판 정보가 업데이트 되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/boards'
 */
boardRouter.patch('/:boardId', loginRequired, async function (req, res, next) {
  try {
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요',
      );
    }

    const { boardId } = req.params;
    const { title, contents, isNotified } = req.body;
    const userId = req.currentUserId;
    const toUpdate = {
      ...(title && { title }),
      ...(contents && { contents }),
      ...(isNotified.toString() && { isNotified }),
    };

    const updatedBoard = await boardService.setBoard({
      userId,
      boardId,
      toUpdate,
    });
    if (!updatedBoard) {
      throw new Error(`${boardId} 정보가 수정되지 않았습니다.`);
    }

    res.status(200).json(updatedBoard);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/boards/{boardId}:
 *   delete:
 *     summary: 게시판 정보를 삭제합니다. -user or admin
 *     tags: [boards]
 *     security:
 *       - JWT: []
 *     parameters:
 *       - in: path
 *         name: boardId
 *         schema:
 *           type: string
 *         required: true
 *         description: board id 고유값을 입력하세요.
 *     responses:
 *       204:
 *         description: 게시판 정보가 삭제되었습니다.
 */
boardRouter.delete('/:boardId', loginRequired, async (req, res, next) => {
  try {
    const { boardId } = req.params;
    let result = await boardService.deleteBoardData(boardId);
    if (!result) {
      throw new Error(`${boardId} 삭제가 완료되지 않았습니다.`);
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/boards/{boardId}:
 *   get:
 *     summary: 게시판 정보를 조회합니다.
 *     tags: [boards]
 *     parameters:
 *       - in: path
 *         name: boardId
 *         schema:
 *           type: string
 *         required: true
 *         description: board id 고유값을 입력하세요.
 *     responses:
 *       200:
 *         description: 게시판이 조회되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 length:
 *                   type: string
 *                   description: 길이
 *                 boards:
 *                   $ref: '#/components/schemas/boards'
 */
boardRouter.get('/:boardId', async function (req, res, next) {
  try {
    const { boardId } = req.params;
    const boards = await boardService.getBoard(boardId);
    res.status(200).json(boards);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/boards:
 *   get:
 *     summary: 게시판 정보 리스트를 조회합니다.
 *     tags: [boards]
 *     parameters:
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         description:  일반 유저-"basic-user", 관리자 "admin", 입력이 없을 시 빈칸
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: 제목 입력시 없을 시 빈칸
 *       - in: query
 *         name: contents
 *         schema:
 *           type: string
 *         description:  내용 입력시 없을 시 반환
 *       - in: query
 *         name: isNotified
 *         schema:
 *           type: boolean
 *         description: 공지글 여부 입력시 없을 시 빈칸
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         description:  입력이 없을시 0부터,
 *       - in: query
 *         name: count
 *         schema:
 *           type: integer
 *         description:  입력이 없을시 10개만큼
 *     responses:
 *       200:
 *         description: 게시판이 조회되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 length:
 *                   type: string
 *                   description: 길이
 *                 boards:
 *                   type: "array"
 *                   $ref: '#/components/schemas/boards'
 */
boardRouter.get('/', async function (req, res, next) {
  try {
    const { role, title, contents, offset, count, isNotified } = req.query;

    const boards = await boardService.getBoardByPagination({
      role,
      title,
      isNotified,
      contents,
      offset,
      count,
    });

    res.status(200).json(boards);
  } catch (error) {
    next(error);
  }
});

export { boardRouter };
