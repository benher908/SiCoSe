import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { requireRole } from '../src/middleware/require-role.js';
function createResponse() {
    return {
        statusCode: 200,
        body: undefined,
        status(code) {
            this.statusCode = code;
            return this;
        },
        json(payload) {
            this.body = payload;
            return this;
        },
    };
}
describe('requireRole middleware', () => {
    it('returns 401 when request has no authenticated user', () => {
        const request = {};
        const response = createResponse();
        let nextCalled = false;
        requireRole('admin')(request, response, () => {
            nextCalled = true;
        });
        assert.equal(response.statusCode, 401);
        assert.deepEqual(response.body, {
            error: 'Authentication required',
            code: 401,
        });
        assert.equal(nextCalled, false);
    });
    it('returns 403 when authenticated user has a forbidden role', () => {
        const request = {
            user: {
                id: 'user-1',
                email: 'secretaria@sicose.test',
                rol: 'secretaria',
            },
        };
        const response = createResponse();
        let nextCalled = false;
        requireRole('admin', 'tesorero')(request, response, () => {
            nextCalled = true;
        });
        assert.equal(response.statusCode, 403);
        assert.deepEqual(response.body, {
            error: 'Forbidden role',
            code: 403,
        });
        assert.equal(nextCalled, false);
    });
    it('calls next when authenticated user has an allowed role', () => {
        const request = {
            user: {
                id: 'user-2',
                email: 'tesorero@sicose.test',
                rol: 'tesorero',
            },
        };
        const response = createResponse();
        let nextCalled = false;
        requireRole('admin', 'tesorero')(request, response, () => {
            nextCalled = true;
        });
        assert.equal(response.statusCode, 200);
        assert.equal(nextCalled, true);
    });
});
//# sourceMappingURL=require-role.test.js.map